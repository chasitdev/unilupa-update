import {Navigation} from 'src/navigation/types/navigation.type';
import TextTitle from '../../ui/Text/TextCustom';
import {TopBarRef} from '../../ui/DetailHeaderActions/DetailHeaderActions';
import {RouteProp, useNavigation} from '@react-navigation/native';
import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {api} from '@api/api';
import {INews} from './interface/opportunities.interface';
import useAuth from 'src/hooks/auth/useAuth';
import {CardOpportunities} from 'src/ui/Cardss/CardOpportunities/CardOpportunities';
import {ProfileScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import HeaderActions from 'src/ui/DetailHeaderActions/HeaderActions';
import Offset from 'src/ui/Offset/Offset';

export interface MyPostsProps {
  navigation: Navigation;
  route: RouteProp<
    Record<string, {params: {id: string}; prevPage: string}>,
    'key'
  >;
}

export const MyPosts: React.FC<MyPostsProps> = memo(
  ({...props}: MyPostsProps) => {
    const navigation = useNavigation<Navigation>();
    const [listNews, setListNews] = useState<INews | null>(null);
    const topBarRef = useRef<TopBarRef>(null);
    const [listIdSaved, setListIdSaved] = useState<string[]>([]);
    const [page, setPage] = useState(1);
    const flatListRef = useRef<FlatList>(null);
    const user = useAuth();

    const getDataNews = useCallback(
      async function (params = {}) {
        const options = {
          ...params,
          page_size: 255,
        };
        const res: INews = await api.fetchNews('/api/v1/users/news/', options, {
          'X-User-Auth': user.user.id,
        });
        console.log({res});
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

    useEffect(() => {
      getDataNews({
        page: 1,
        page_size: 3,
      });
      //eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
console.log({listNews});
    return (
      <View style={styles.container}>
        <SafeAreaView style={styles.safe}>
          <HeaderActions ref={topBarRef} pathCameBack={ProfileScreen.USER} />
          <FlatList
            ref={flatListRef}
            data={listNews?.data ?? []}
            keyExtractor={item =>
              `${item.id}-${Math.random().toString(36).substr(2, 5)}`
            }
            ListHeaderComponent={
              <View>
                <Offset mt={70} />
                <TextTitle style={{fontSize: 20}}>Мої пости</TextTitle>
              </View>
            }
            renderItem={({item}) => (
              <CardOpportunities
                item={item}
                isSaved={listIdSaved.includes(item.id)}
                handleChangeScreen={handleChangeScreenDetailCard}
                handleAddOrRemoveWishlist={fetchUPostAddOrRemoveWishList}
                pathToScreen={StackScreenBottomMenu.MyPosts}
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
