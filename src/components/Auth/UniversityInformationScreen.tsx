import BottomSheet from '../../ui/Buttons/BottomSheet';
import CommentMessage from '../../ui/Text/CommentMessage';
import CollapsibleSection from '../Education Screen/CollapsibleCollection';
import TextCustom from '../../ui/Text/TextCustom';
import Hostel from '../../ui/ScreenView/University Information Screen/Hostel';
import DetailHeaderActions, {
  TopBarRef,
} from '../../ui/DetailHeaderActions/DetailHeaderActions';
import UniversityDescription from '../../ui/ScreenView/University Information Screen/UniversityDescription';
import DetailHeaderImage from '../../ui/DetailHeaderImage/DetailHeaderImage';
import UniversityImageGallery from '../../ui/ScreenView/University Information Screen/UniversityImageGallery';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import PreloaderFullScreen from '@components/Preloader/PreloaderFullScreen';
import {Navigation} from 'src/navigation/types/navigation.type';
import {RouteProp} from '@react-navigation/native';
import {UniversityInterface} from 'src/ui/ScreenView/MainScreen/interfaces/university.interface';
import {baseApiUrl} from 'src/api/config';
import {StorageEnum} from 'src/navigation/types/storage.type';
import {HomeScreen} from 'src/types/screens.type';
import {icon} from 'src/assets/icons';
import LinkButton from 'src/ui/Buttons/LinkButton';

interface Props {
  navigation: Navigation;
  route: RouteProp<
    Record<string, {university: UniversityInterface; prevPage: string}>,
    'key'
  >;
}

const UniversityInformationScreen: React.FC<Props> = props => {
  const [university, setUniversity] = useState<UniversityInterface>();
  // const [loading, setLoading] = useState(false);
  const paramUniversity = props?.route?.params?.university;
  const prevPage = props.route.params?.prevPage;
  const {addComparison} = useUniversityContext();
  const [commentModalVisible, setCommentModalVisible] = useState<
    true | null | string
  >(null);
  const mapRef = useRef<MapView>(null);

  const fetchUniverData = useCallback(
    async function () {
      let url = `${baseApiUrl}/university/one/${paramUniversity.id}`;
      const response = await axios.get(url, {});
      console.log({response});
      setUniversity(response.data);
      // setLoading(false);
    },
    [paramUniversity.id],
  );

  useEffect(() => {
    fetchUniverData();
  }, [paramUniversity, fetchUniverData]);

  const focus = (latitude: number, longitude: number) => {
    if (mapRef.current === null) {
      return;
    }

    mapRef.current.animateToRegion({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const getAllUniqueSpecialityNames = () => {
    if (!university) return [];

    const used: string[] = [];

    const specs = university.specialties.filter((s: any) => {
      const res = !used.includes(s.specialityCode);
      // console.log(s.specialityCode, s.specialityName);
      used.push(s.specialityCode);

      return res;
    });

    return specs;
  };

  const getAllSpecialities = (code: string) => {
    if (!university) return [];

    const specs = university.specialties.filter(
      (s: any) => s.specialityCode === code,
    );

    const uniq: any[] = [];

    specs.map((s: any) => {
      const f = uniq.find(f => {
        return (
          s.educationPrograms == f.educationPrograms &&
          s.annualFee == f.annualFee &&
          s.studyTerm == f.studyTerm &&
          s.educationForm == f.educationForm &&
          s.educationLevel == f.educationLevel
        );
      });

      if (!f) {
        uniq.push(s);
        return s;
      }
    });

    return uniq.filter(s => !!s);
  };

  function formatDuration(duration: string) {
    const regex = /(\d+)р(\d+)м/;
    const match = duration.match(regex);

    if (!match) return '';

    const years = parseInt(match[1], 10);
    const months = parseInt(match[2], 10);

    let formattedDuration = '';

    if (years > 0) {
      formattedDuration += `${years} ${
        years === 1 ? 'рік' : years < 5 ? 'роки' : 'років'
      }`;
    }

    if (months > 0) {
      if (formattedDuration) {
        formattedDuration += ' ';
      }
      formattedDuration += `${months} ${
        months === 1 ? 'місяць' : months < 5 ? 'місяці' : 'місяців'
      }`;
    }

    return formattedDuration;
  }

  const topBarRef = useRef<TopBarRef>(null);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newOpacity = Math.max(0.35, 1 - scrollY / 700);
    topBarRef.current?.setOpacity(newOpacity);
  };

  const handleSendComment = async (comment: string, rate: number) => {
    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);

    if (!accessToken || !university) {
      return;
    }

    console.log(
      'Comment',
      comment,
      'Rate',
      rate,
      'Parent Comment',
      commentModalVisible,
    );

    await axios.post(
      `${baseApiUrl}/comments/create`,
      {
        universityId: university.id,
        comment,
        rate,
        parentCommentId:
          commentModalVisible === null || commentModalVisible === true
            ? undefined
            : commentModalVisible,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    fetchUniverData();
  };

  if (!university) return <PreloaderFullScreen />;
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safe}>
        <DetailHeaderActions
          ref={topBarRef}
          navigation={props.navigation}
          itemId={university.id}
          title={''}
          onComparisonPress={() => {
            addComparison(university);
            props.navigation.navigate(HomeScreen.COMPARISON);
          }}
          pathCameBack={prevPage}
          isSaved={false}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <View style={styles.image}>
            <DetailHeaderImage
              name={university.fullName || university.shortName}
              city={university.adress}
              previewImage={university.previewImageUrl || university.logo}
            />

            <View
              style={{
                marginTop: 16,
                marginHorizontal: 16,
                display: 'flex',
                flexDirection: 'row',
                gap: 16,
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center', gap: 8}}>
                <TextCustom fontSize={14} fontWeight="600" color="#FFFFFF5B">
                  Бюджетних місць
                </TextCustom>
                <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                  {university.budgetSeatsCount || 'Невідомо'}
                </TextCustom>
              </View>

              <View style={{alignItems: 'center', gap: 8}}>
                <TextCustom fontSize={14} fontWeight="600" color="#FFFFFF5B">
                  Контрактних місць
                </TextCustom>
                <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                  {university.seatsCount
                    ? university.seatsCount - (university.budgetSeatsCount || 0)
                    : 'Невідомо'}
                </TextCustom>
              </View>
            </View>

            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image source={icon.linkIcon} style={styles.logo} />
              </View>
              <TouchableOpacity
                onPress={async () => {
                  if (!university.url) return;

                  const url = university.url.startsWith('http')
                    ? university.url
                    : `http://${university.url}`;
                  Linking.openURL(url);
                }}>
                <TextCustom
                  fontSize={18}
                  fontWeight="600"
                  lineHeight={18}
                  color="#53A1FF"
                  style={styles.linkText}>
                  {university.url}
                </TextCustom>
              </TouchableOpacity>
            </View>

            <UniversityDescription
              description={university.description}
              url={university.url}
            />
            <View style={styles.gallery}>
              <UniversityImageGallery
                imagesUrl={university.imagesUrl}
                title={'Галарея головного корпусу'}
              />
            </View>
          </View>

          {university.latitude && university.longitude && (
            <View
              style={{
                marginHorizontal: 16,
                gap: 16,
              }}>
              <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                Геолокація на карті
              </TextCustom>

              <View
                style={{
                  width: '100%',
                  aspectRatio: 1.5,
                  backgroundColor: '#F5F5F5',
                  borderWidth: 1,
                  borderColor: '#D5D8DC',
                  borderRadius: 16,
                  overflow: 'hidden',
                  marginBottom: 16,
                }}>
                <MapView
                  ref={mapRef}
                  initialRegion={{
                    latitude: university.latitude || 0,
                    longitude: university.longitude || 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }}
                  style={StyleSheet.absoluteFillObject}>
                  <Marker
                    key={university.id}
                    coordinate={{
                      latitude: university.latitude,
                      longitude: university.longitude,
                    }}
                    title={university.shortName}
                    description={university.adress}
                  />

                  {university.hostels?.map(hostel => {
                    return (
                      <Marker
                        key={hostel.id}
                        coordinate={{
                          latitude: hostel.latitude,
                          longitude: hostel.longitude,
                        }}
                        title={hostel.name}
                        description={hostel.adress}
                      />
                    );
                  })}
                </MapView>
              </View>
            </View>
          )}

          {university.hostels && university.hostels.length > 0 && (
            <View style={styles.hostel}>
              <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                Гуртожиток
              </TextCustom>

              {university.hostels.map((hostel, index) => {
                if (hostel.adress == 'null') {
                  return null;
                }

                return (
                  <Hostel
                    key={hostel.id || index}
                    imagesUrl={hostel.photoUrls}
                    name={hostel.name || `Гуртожиток № ${index + 1}`}
                    price={hostel.cost}
                    address={hostel.adress}
                    onPress={() => {
                      if (!hostel.latitude || !hostel.longitude) {
                        Linking.openURL(
                          `https://www.google.com/maps/place/${hostel.adress}`,
                        );
                        return;
                      }
                      focus(hostel.latitude, hostel.longitude);
                    }}
                  />
                );
              })}
            </View>
          )}

          {getAllUniqueSpecialityNames().length > 0 && (
            <View style={styles.dropdown}>
              <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                {`Спеціальності: ${getAllUniqueSpecialityNames().length}`}
              </TextCustom>

              {getAllUniqueSpecialityNames().map((s: any) => (
                <CollapsibleSection
                  key={s.specialityCode}
                  title={`${s.specialityName} (${s.specialityCode})`}>
                  {getAllSpecialities(s.specialityCode).map((e, index) => (
                    <View
                      key={index}
                      style={{
                        width: '100%',
                        minHeight: 95,
                        borderColor: '#8F8F92',
                        borderWidth: 1,
                        padding: 16,
                        borderRadius: 16,
                        gap: 2,
                      }}>
                      <TextCustom fontSize={16}>
                        {e.educationPrograms}
                      </TextCustom>

                      <View
                        style={{
                          marginTop: 8,
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextCustom
                          fontSize={14}
                          color="#91939F"
                          fontWeight="300">
                          Вартість:
                        </TextCustom>

                        <TextCustom fontSize={14} fontWeight="500">
                          {e.annualFee} грн/рік
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextCustom
                          fontSize={14}
                          color="#91939F"
                          fontWeight="300">
                          Термін навчання:
                        </TextCustom>

                        <TextCustom fontSize={14} fontWeight="500">
                          {formatDuration(e.studyTerm)}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextCustom
                          fontSize={14}
                          color="#91939F"
                          fontWeight="300">
                          Форма навчання:
                        </TextCustom>

                        <TextCustom fontSize={14} fontWeight="500">
                          {e.educationForm}
                        </TextCustom>
                      </View>

                      <View
                        style={{
                          display: 'flex',
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                        }}>
                        <TextCustom
                          fontSize={14}
                          color="#91939F"
                          fontWeight="300">
                          Освітній ступінь:
                        </TextCustom>

                        <TextCustom fontSize={14} fontWeight="500">
                          {e.educationLevel}
                        </TextCustom>
                      </View>
                    </View>
                  ))}
                </CollapsibleSection>
              ))}
            </View>
          )}

          <View style={styles.dropdown}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
                Відгуки
              </TextCustom>

              <LinkButton
                title="Залишити відгук"
                onPress={() => {
                  setCommentModalVisible(true);
                }}
              />
            </View>
            {university.comments
              .sort(
                (a, b) =>
                  new Date(b.createdAt).getTime() -
                  new Date(a.createdAt).getTime(),
              )
              .map(comment => {
                if (comment.parentComment) return null;

                return (
                  <CommentMessage
                    key={comment.id}
                    comment={comment.comment}
                    likes={comment.likes}
                    dislikes={comment.dislikes}
                    rate={comment.rate}
                    fullname={comment.fullname}
                    dislikedBy={comment.dislikedBy}
                    likedBy={comment.likedBy}
                    imageUrl={comment.imageUrl}
                    createdAt={comment.createdAt}
                    id={comment.id}
                    parentComment={comment.parentComment}
                    onPress={() => {
                      setCommentModalVisible(comment.id);
                    }}
                    children={university.comments
                      .filter(c => c.parentComment?.id === comment.id)
                      .sort(
                        (a, b) =>
                          new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime(),
                      )
                      .map(c => (
                        <CommentMessage
                          isChild
                          key={c.id}
                          comment={c.comment}
                          likes={c.likes}
                          dislikes={c.dislikes}
                          rate={c.rate}
                          fullname={c.fullname}
                          dislikedBy={c.dislikedBy}
                          likedBy={c.likedBy}
                          imageUrl={c.imageUrl}
                          createdAt={c.createdAt}
                          id={c.id}
                          onPress={function (): void {
                            throw new Error('Function not implemented.');
                          }}
                          parentComment={null}
                        />
                      ))}
                  />
                );
              })}

            {university.comments.length === 0 && (
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 100,
                }}>
                <TextCustom
                  color="#FFFFFF95"
                  fontSize={16}
                  fontWeight="400"
                  lineHeight={24}>
                  Наразі відгуки відсутні
                </TextCustom>
              </View>
            )}
          </View>
          <View
            style={{
              height: 16,
            }}
          />
        </ScrollView>
      </SafeAreaView>

      <BottomSheet
        isOpen={commentModalVisible}
        onClose={() => setCommentModalVisible(null)}
        onSend={handleSendComment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    width: 24,
    height: 24,
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  row: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  linkText: {
    marginLeft: 18,
  },
  container: {
    alignItems: 'center',
    backgroundColor: 'black',
    flex: 1,
  },
  gallery: {
    padding: 16,
  },
  safe: {
    width: '95%',
    alignSelf: 'center',
  },
  image: {
    marginTop: 8,
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  dropdown: {
    width: '90%',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  hostel: {
    gap: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 32,
  },
  gap: {
    gap: 15,
  },
});

export default UniversityInformationScreen;
