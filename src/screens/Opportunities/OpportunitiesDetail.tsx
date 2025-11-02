import {Navigation} from 'src/navigation/types/navigation.type';
import TextTitle from '../../ui/Text/TextCustom';
import DetailHeaderActions, {
  TopBarRef,
} from '../../ui/DetailHeaderActions/DetailHeaderActions';
import DetailHeaderImage from '../../ui/DetailHeaderImage/DetailHeaderImage';
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import PreloaderFullScreen from '@components/Preloader/PreloaderFullScreen';
import {api, apiUniverse} from '@api/api';
import {INews, IOneNews} from './interface/opportunities.interface';
import {icon} from 'src/assets/icons';
import Offset from '../../ui/Offset/Offset';
import DescriptionSectionDetailCard from '../../ui/Text/DescriptionSecton/DescriptionSectionDetailCard';
import {getMe} from '@api/types/getMe';
import useAuth from 'src/hooks/auth/useAuth';
import WrapDescriptionCenter from 'src/ui/Wrap/WrapDescriptionCenter';
import {CardOpportunities} from 'src/ui/Cardss/CardOpportunities/CardOpportunities';
import {StackScreenBottomMenu} from 'src/types/screens.type';

export interface OpportunitiesDetailProps {
  navigation: Navigation;
  route: RouteProp<
    Record<string, {params: {id: string}; prevPage: string}>,
    'key'
  >;
}

export const OpportunitiesDetail: React.FC<OpportunitiesDetailProps> = memo(
  ({...props}: OpportunitiesDetailProps) => {
    const navigation = useNavigation<Navigation>();
    const [listNews, setListNews] = useState<INews | null>(null);
    const {id} = props.route.params.params;
    const {prevPage} = props.route.params;
    const [oneNews, setOneNews] = React.useState<IOneNews | null>(null);
    const topBarRef = useRef<TopBarRef>(null);
    const [listIdSaved, setListIdSaved] = useState<string[]>([]);
    const {user} = useAuth();
    const [page, setPage] = useState(1);
    const flatListRef = useRef<FlatList>(null);

    const getDataNews = useCallback(
      async function (params = {}) {
        const options = {
          ...params,
          page_size: 5,
        };
        const res: INews = await api.fetchNews('/api/v1/news/', options);
        if (res.meta.total_pages === page) {
          return;
        }
        if (res.data.length === 0) {
          setListNews(prevList => ({
            ...res,
            data: [],
            meta: {
              ...prevList?.meta,
              ...res.meta,
            },
          }));
          return;
        }
        if (res.meta.page === 1) {
          setListNews({
            ...res,
            data: [...res.data],
            meta: {
              ...res.meta,
            },
          });
          setPage(p => p + 1);
          return;
        }
        setPage(p => p + 1);
        setListNews(prevList => ({
          ...prevList,
          ...res,
          data: [...(prevList?.data ?? []), ...res.data],
          meta: {
            ...prevList?.meta,
            ...res.meta,
          },
        }));
      },
      [page],
    );
    const handleScroll = (event: any) => {
      const scrollY = event.nativeEvent.contentOffset.y;
      const newOpacity = Math.max(0.35, 1 - scrollY / 700);
      topBarRef.current?.setOpacity(newOpacity);
    };

    const scrollToTop = () => {
      flatListRef.current?.scrollToOffset({animated: true, offset: 0});
    };

    console.log(
      'OpportunitiesDetail',
      user.id,
      id,
      JSON.stringify(props.route.params?.prevPage, null, 4),
    );

    useEffect(() => {
      getDataNews({
        page: 1,
        page_size: 3,
      });
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const fetchDataCard = async (idParam: string) => {
        try {
          const res: IOneNews = await api.fetchOneNews(
            '/api/v1/news/' + idParam,
            {},
            {
              'X-User-Auth': user.id,
            },
          );
          console.log('res', res);
          if (res) {
            setOneNews(res);
          } else {
            console.log('Error fetching data');
          }
        } catch (error) {
          console.error('Error fetchDataCard', error);
        }
      };
      fetchDataCard(id);
    }, [user.id, id]);

    useFocusEffect(
      useCallback(() => {
        const fetchIdWishlist = async function () {
          const url = '/wish-list-item/get-all-list';
          const res = await apiUniverse.fetchUGet(url, {
            userId: user?.id,
          });
          setListIdSaved(res?.data?.map((item: any) => item.newsId) || []);
        };

        fetchIdWishlist();
      }, [user?.id]),
    );

    const fetchUPostAddOrRemoveWishList = async (
      newsId: string,
      title: string,
    ): Promise<void> => {
      const myUser: any = await getMe();
      const params = {
        userId: myUser.data.id,
        newsId,
        titleNews: title,
      };
      const res = await apiUniverse.fetchUPost(
        '/wish-list-item/add-or-remove',
        params,
      );
      setListIdSaved(res?.data?.map((item: any) => item.newsId) || []);
    };

    const handleChangeScreenDetailCard = (path: string, id: string) => {
      console.log('handleChangeScreenDetailCard', path, id);
      scrollToTop();
      navigation.navigate({
        name: path,
        params: {
          screen: path,
          params: {
            id,
          },
        },
      });
    };

    if (!oneNews) return <PreloaderFullScreen />;

    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safe}>
          <DetailHeaderActions
            ref={topBarRef}
            navigation={props.navigation}
            itemId={oneNews.id}
            isSaved={listIdSaved.includes(oneNews.id)}
            title={oneNews.processed_data.title}
            handleAddOrRemoveWishlist={fetchUPostAddOrRemoveWishList}
            pathCameBack={prevPage}
          />
          <FlatList
            ref={flatListRef}
            data={listNews?.data ?? []}
            keyExtractor={item =>
              `${item.id}-${Math.random().toString(36).substr(2, 5)}`
            }
            ListHeaderComponent={
              <View>
                <View style={styles.image}>
                  <DetailHeaderImage
                    name={oneNews.processed_data.title}
                    city={oneNews.processed_data.place_data.address}
                    previewImage={oneNews.processed_data.media[0].url}
                  />

                  {/* {oneNews.processed_data.links.length > 0 && <Offset mt={20} />}
            {oneNews.processed_data.links.length > 0 &&
              oneNews.processed_data.links.map(l => (
                <View style={styles.row} key={l}>
                  <View style={styles.imageContainer}>
                    <Image source={icon.bookWritePng} style={styles.logo} />
                  </View>
                  <TouchableOpacity
                    onPress={async () => {
                      if (!l) return;
                      const url = l;
                      Linking.openURL(url);
                    }}>
                    <TextTitle
                      fontSize={18}
                      fontWeight="600"
                      lineHeight={18}
                      color="#53A1FF"
                      style={styles.linkText}>
                      {l}
                    </TextTitle>
                  </TouchableOpacity>
                </View>
              ))} */}
                </View>

                <View style={styles.infoContainer}>
                  {/* <TextTitle
              fontSize={20}
              fontWeight="600"
              textAlign="left"
              lineHeight={24}
              style={{width: '100%'}}>
              Загальна інформація
            </TextTitle> */}
                  <View style={styles.containerLocation}>
                    <View style={styles.halfBlock}>
                      <DescriptionSectionDetailCard
                        center
                        desc={
                          oneNews.processed_data.place_data?.address &&
                          oneNews.processed_data.place_data?.region
                            ? `${oneNews.processed_data.place_data.address}, ${oneNews.processed_data.place_data.region}`
                            : 'Немає даних'
                        }
                        title="Місце:"
                        icon={icon.settingsLocation}
                      />
                    </View>

                    <View style={styles.halfBlock}>
                      <DescriptionSectionDetailCard
                        center
                        desc={
                          (oneNews.processed_data.date_range?.date_from
                            ? new Date(
                                oneNews.processed_data.date_range.date_from,
                              ).toLocaleDateString('ru')
                            : '') +
                          (oneNews.processed_data.date_range?.date_to &&
                          oneNews.processed_data.date_range?.date_from
                            ? ' - '
                            : '') +
                          (oneNews.processed_data.date_range?.date_to
                            ? new Date(
                                oneNews.processed_data.date_range.date_to,
                              ).toLocaleDateString('ru')
                            : '')
                        }
                        title="Дата проєкту:"
                        icon={icon.calender}
                      />
                    </View>
                  </View>

                  <Offset mt={15} />
                  <WrapDescriptionCenter backgroundColor="#202026">
                    <DescriptionSectionDetailCard
                      center
                      desc={
                        oneNews.processed_data.deadline_date ?? 'Немає даних'
                      }
                      title="Зареєструватися до:"
                      icon={icon.fire}
                    />
                  </WrapDescriptionCenter>

                  <Offset mt={15} />
                  <WrapDescriptionCenter>
                    <DescriptionSectionDetailCard
                      desc={oneNews.processed_data.condition ?? 'Немає даних'}
                      title="Фінансування:"
                      icon={icon.dollar}
                    />
                  </WrapDescriptionCenter>
                  <Offset mt={15} />

                  <DescriptionSectionDetailCard
                    border
                    desc={oneNews.processed_data.description ?? 'Немає даних'}
                    title="Опис"
                  />
                  <Offset mt={15} />

                  <DescriptionSectionDetailCard
                    border
                    desc={
                      oneNews.processed_data.participants?.description
                        ? [
                            oneNews.processed_data.participants.age,
                            oneNews.processed_data.participants.description,
                          ]
                        : 'Немає даних'
                    }
                    title="Вимоги"
                  />
                </View>
                <Offset mt={25} />
                <TextTitle fontSize={20} color="#ffffff">
                  Інші рекомендовані можливості
                </TextTitle>
                <Offset mt={30} />
              </View>
            }
            renderItem={({item}) => (
              <CardOpportunities
                item={item}
                isSaved={listIdSaved.includes(item.id)}
                handleChangeScreen={handleChangeScreenDetailCard}
                handleAddOrRemoveWishlist={fetchUPostAddOrRemoveWishList}
                pathToScreen={StackScreenBottomMenu.OpportunitiesDetail}
              />
            )}
            onEndReached={() => getDataNews({page})}
            onEndReachedThreshold={1}
          />
        </SafeAreaView>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  containerLocation: {
    flexDirection: 'row',
    flex: 1,
  },
  halfBlock: {
    width: '50%',
    paddingRight: 10,
    paddingLeft: 10,
  },
  imageContainer: {
    width: 24,
    height: 24,
    left: 10,
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
    // marginTop: 24,
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
  infoContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    flexDirection: 'column',
  },
});
