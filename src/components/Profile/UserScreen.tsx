import React, {useCallback, useEffect, useState} from 'react';
import {View, Image, ScrollView, TouchableOpacity} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, RouteProp} from '@react-navigation/native';

import {baseApiUrl} from '@api/config';
import {UserInterface} from '@api/types/user.interface';
import {CityType} from 'src/types/city.enum';
import {specialities} from 'src/types/specialties';
import {Navigation} from 'src/navigation/types/navigation.type';
import {ProfileScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import useAuth from 'src/hooks/auth/useAuth';
import {countMatches} from '@utils/countMatches';
import LinkButton from 'src/ui/Buttons/LinkButton';
import {icon} from 'src/assets/icons';
import {styles} from './styles/user-screen-style';
import SplashScreen from './../Auth/Onboarding/SplashScreen';
import TextCustom from 'src/ui/Text/TextCustom';
import TextTitle from 'src/ui/Text/TextTitle';
import Offset from 'src/ui/Offset/Offset';
import CollapsibleSection from '../Education Screen/CollapsibleCollection';
import EducationOptionButton from '../Education Screen/EducationOptionButton';
import ButtonColorBiggest from 'src/ui/Buttons/ButtonColorBiggest';
import FilterOpportunitiesClasifView from 'src/ui/Filters/FilterList/FilterOpportunitiesClasifView';
import {
  IClassification,
  IClassificationNews,
} from 'src/screens/Opportunities/interface/opportunities.interface';
import {api} from 'src/api/api';

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {access_token: string}>, 'key'>;
}

const UserScreen: React.FC<Props> = ({navigation}) => {
  const auth = useAuth();
  const [user, setUser] = useState<UserInterface | null>(null);
  const [lisClassificationNews, setLisClassificationNews] = useState<
    IClassificationNews[] | []
  >([]);
  useEffect(() => {
    setUser(auth.user);
  }, [auth.user]);

  // get classification news list
  useEffect(() => {
    const getClassifications = async function () {
      const res: IClassification = await api.fetchClassificationNews(
        '/api/v2/clasif/',
      );
      setLisClassificationNews(res.data);
    };
    getClassifications();
  }, []);

  const getUserInfo = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem('accessToken');

    try {
      const response = await axios.get(`${baseApiUrl}/users/me`, {
        headers: {Authorization: `Bearer ${accessToken}`},
      });

      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [getUserInfo]),
  );

  if (!user) {
    return (
      <View style={styles.screen}>
        <SplashScreen />
      </View>
    );
  }

  if (user.city?.length === 0) {
    setUser({...user, city: [CityType.ALL]});
  }

  const haveResults =
    !!user?.ukrainianResultsNMT ||
    !!user?.mathResultsNMT ||
    !!user?.historyResultsNMT ||
    (!!user?.foreignLanguageResultsNMT && !!user?.foreignLanguageSubgect);

  const haveSpecialities = user?.specialities.length > 0;

  return (
    <View style={{flex: 1}}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}>
        <View style={styles.content}>
          <View style={styles.topRectangle}></View>
          {/* Настройки header */}
          <View style={styles.containerHeader}>
            <TextTitle title="Профіль" fontSize={32} location="left" />
            <TouchableOpacity
              style={styles.settingsButton}
              onPress={() =>
                navigation.navigate({
                  name: StackScreenBottomMenu.PROFILE,
                  params: {
                    screen: ProfileScreen.SETTINGS,
                  },
                })
              }>
              <Image source={icon.settingsButton} style={styles.settingsIcon} />
            </TouchableOpacity>
          </View>

          <View style={styles.userInformation}>
            <Image
              source={{
                uri: user?.avatarUrl
                  ? `${baseApiUrl}/${user.avatarUrl}`
                  : 'https://sites.cns.utexas.edu/sites/default/files/geometry_lab/files/default_person.jpg?m=1654796730',
              }}
              style={styles.image}
            />
            {/* Имя пользователя */}
            <View style={[styles.row, {gap: 8}]}>
              <TextCustom
                fontSize={32}
                fontWeight="600"
                style={styles.nameText}>
                {user?.fullname ?? ''}
              </TextCustom>

              <View style={styles.iconEdit}>
                <IconButton
                  onPress={() =>
                    navigation.navigate({
                      name: StackScreenBottomMenu.PROFILE,
                      params: {
                        screen: ProfileScreen.EDIT_PROFILE,
                      },
                    })
                  }
                />
              </View>
            </View>
            {/* two biggest btns  post and achievements*/}
            <View style={styles.btnsContainerBiggest}>
              <ButtonColorBiggest
                onPress={() =>
                  navigation.navigate({
                    name: StackScreenBottomMenu.PROFILE,
                    params: {
                      screen: ProfileScreen.MY_POSTS,
                    },
                  })
                }
                title="Мої пости"
                desc="0 опубліковано"
                gradient={['#1B6EFD', '#1E2D68']}
                directionGradient="to-right"
                sourceImage={icon.capKnowledge}
              />
              <ButtonColorBiggest
                onPress={() => console.log('click')}
                title="Досягнення"
                desc=" 0/15"
                gradient={['#1BFDAE', '#1E6854']}
                directionGradient="to-right"
                sourceImage={icon.cup}
              />
            </View>
            {/* one biggest btn info motivation */}
            <View style={[styles.btnsContainerBiggest]}>
              <ButtonColorBiggest
                onPress={() => console.log('click achievement')}
                title="Натисни, щоб переглянути як цей додаток повпливав на тебе"
                gradient={['#0E3FF0', '#0B149A']}
                directionGradient="to-right"
                styleTitle={{
                  marginTop: 35,
                  paddingLeft: 30,
                  paddingRight: 30,
                  textAlign: 'center',
                }}
              />
            </View>

            <Offset mt={23} />
            <View style={styles.infoContainer}>
              <View style={[styles.row, {gap: 8}]}>
                <TextCustom
                  fontSize={20}
                  fontWeight="600"
                  style={styles.studyText}>
                  Мої інтереси
                </TextCustom>
              </View>
              <FilterOpportunitiesClasifView
                filter={{clasif: ['']}}
                list={lisClassificationNews}
                onChangeFilter={() => {}}
                keys={'clasif'}
              />
            </View>
            {/* -------------------------------------------------------------------------- */}
            {/* Инфо блок: учебное заведение и год */}
            <View
              style={{
                ...styles.row,
                gap: 48,
                marginTop: 16,
                width: '100%',
                paddingRight: 60,
                paddingLeft: 20,
                justifyContent: 'space-between',
              }}>
              {/* Вступаю в */}
              <View style={{alignItems: 'center', gap: 8}}>
                <TextCustom fontSize={14} fontWeight="600" color="#FFFFFF5B">
                  Вступаю в
                </TextCustom>
                <TextCustom fontSize={20} fontWeight="600">
                  {user.educationInstitution || 'Не цього року'}
                </TextCustom>
                {/* edit btn */}
                <View style={{...styles.iconEdit, top: 18}}>
                  <IconButton
                    onPress={() =>
                      navigation.navigate({
                        name: StackScreenBottomMenu.PROFILE,
                        params: {
                          screen: ProfileScreen.WHERE_YOU_GO_SETTINGS,
                        },
                      })
                    }
                  />
                </View>
              </View>

              {/* Рік НМТ */}
              <View style={{alignItems: 'center', gap: 8}}>
                <TextCustom fontSize={14} fontWeight="600" color="#FFFFFF5B">
                  Рік НМТ/ЗНО
                </TextCustom>
                <TextCustom fontSize={20} fontWeight="600">
                  {user.passYear || 'Не складав'}
                </TextCustom>
                {/* edit btn */}
                <View style={{...styles.iconEdit, top: 18}}>
                  <IconButton
                    onPress={() =>
                      navigation.navigate({
                        name: StackScreenBottomMenu.PROFILE,
                        params: {
                          screen: ProfileScreen.RESULTS_NMT,
                        },
                      })
                    }
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Результати */}
        <View style={styles.infoContainer}>
          <View style={[styles.row, {gap: 8}]}>
            <TextCustom fontSize={20} fontWeight="600" style={styles.studyText}>
              Результати ЗНО/НМТ
            </TextCustom>
            {haveResults && (
              <View style={{...styles.iconEdit, top: -5, right: 0}}>
                <IconButton
                  onPress={() =>
                    navigation.navigate({
                      name: StackScreenBottomMenu.PROFILE,
                      params: {
                        screen: ProfileScreen.RESULTS_NMT,
                      },
                    })
                  }
                />
              </View>
            )}
          </View>

          {!haveResults && (
            <LinkButton
              title="+ Додати результати"
              onPress={() =>
                navigation.navigate({
                  name: StackScreenBottomMenu.PROFILE,
                  params: {
                    screen: ProfileScreen.RESULTS_NMT,
                  },
                })
              }
            />
          )}

          {user.ukrainianResultsNMT && (
            <NMTComponent
              title="Українська мова"
              value={user.ukrainianResultsNMT}
            />
          )}
          {user.mathResultsNMT && (
            <NMTComponent title="Математика" value={user.mathResultsNMT} />
          )}
          {user.historyResultsNMT && (
            <NMTComponent title="Історія" value={user.historyResultsNMT} />
          )}
          {user.foreignLanguageResultsNMT && (
            <NMTComponent
              title={user.foreignLanguageSubgect}
              value={user.foreignLanguageResultsNMT}
            />
          )}
        </View>

        {/* Регіони */}
        <View style={styles.infoContainer}>
          <View style={[styles.row, {gap: 8}]}>
            <TextCustom fontSize={20} fontWeight="600" style={styles.studyText}>
              Регіони
            </TextCustom>
            {/* edit btn */}
            <View style={{...styles.iconEdit, top: -5, right: 0}}>
              <IconButton
                onPress={() =>
                  navigation.navigate({
                    name: StackScreenBottomMenu.PROFILE,
                    params: {
                      screen: ProfileScreen.LOCATION_SETTINGS,
                    },
                  })
                }
              />
            </View>
          </View>

          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
            {user.city?.map(city => (
              <View key={city} style={styles.cityTag}>
                <TextCustom fontSize={16} fontWeight="400" color="#fff">
                  {city}
                </TextCustom>
              </View>
            ))}
          </View>
        </View>

        {/* Галузі */}
        <View style={styles.infoContainer}>
          <View style={[styles.row, {gap: 8}]}>
            <TextCustom fontSize={20} fontWeight="600" style={styles.studyText}>
              Галузь освіти
            </TextCustom>
            {haveSpecialities && (
              <View style={{...styles.iconEdit, top: -5, right: 0}}>
                <IconButton
                  onPress={() =>
                    navigation.navigate({
                      name: StackScreenBottomMenu.PROFILE,
                      params: {
                        screen: ProfileScreen.CHOOSE_EDUCATION_SETTINGS,
                      },
                    })
                  }
                />
              </View>
            )}
          </View>

          {!haveSpecialities && (
            <LinkButton
              title="+ Обрати галузь"
              onPress={() =>
                navigation.navigate({
                  name: StackScreenBottomMenu.PROFILE,
                  params: {
                    screen: ProfileScreen.CHOOSE_EDUCATION_SETTINGS,
                  },
                })
              }
            />
          )}

          {specialities.map(section => {
            const count = countMatches(
              section.specialties.map(s => s.code),
              user?.specialities,
            );

            if (count <= 0) return null;

            return (
              <CollapsibleSection
                key={section.code}
                title={`${section.name} (${count})`}>
                {section.specialties.map(s =>
                  user?.specialities.includes(s.code) ? (
                    <EducationOptionButton
                      key={s.code}
                      title={s.name}
                      onPress={() => {}}
                      isSelected
                    />
                  ) : null,
                )}
              </CollapsibleSection>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const IconButton = ({onPress}: {onPress: () => void}) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <Image
        source={icon.editProfileIcon}
        style={{
          width: 16,
          height: 16,
          marginRight: 5,
          tintColor: '#FFFFFF5C',
        }}
      />
    </TouchableOpacity>
  );
};

const NMTComponent = ({title, value}: {title: string; value: number}) => {
  if (!title || value === null || value === undefined) {
    return null;
  }

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}>
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <TextCustom fontSize={14} fontWeight="600" color="#FFFFFF5B">
          {title}
        </TextCustom>

        <View
          style={{
            flex: 1,
            height: 1,
            marginHorizontal: 10,
            marginTop: 9,
            backgroundColor: '#FFFFFF22',
          }}
        />

        <TextCustom fontSize={20} fontWeight="600" lineHeight={24}>
          {value}
        </TextCustom>
      </View>
    </View>
  );
};

export default UserScreen;
