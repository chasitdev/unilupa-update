import {Navigation} from 'src/navigation/types/navigation.type';
import {CardOpportunities} from '../../ui/Cardss/CardOpportunities/CardOpportunities';
import React, {useCallback, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View} from 'react-native';
import {api, apiUniverse} from '@api/api';
import {INews} from '../opportunities/interface/opportunities.interface';
import {StackScreenBottomMenu, WishlistPath} from 'src/types/screens.type';
import {styles} from './styles/wishlist-opportunities-style';
import Offset from '../../ui/Offset/Offset';
import useAuth from 'src/hooks/auth/useAuth';
import {useFocusEffect} from '@react-navigation/native';
import TextTitle from 'src/ui/Text/TextTitle';

interface Props {
  navigation: Navigation;
}

const OpportunitiesWishlist: React.FC<Props> = props => {
  const [listNews, setListNews] = useState<INews | null>(null);
  const [listIdSaved, setListIdSaved] = useState<string[]>([]);

  const listRef = React.useRef<FlatList>(null);
  const {user} = useAuth();

  useFocusEffect(
    useCallback(() => {
      const fetchIdWishlist = async function () {
        const url = '/wish-list-item/get-all-list';
        const res = await apiUniverse.fetchUGet(url, {
          userId: user?.id,
        });
        const listIdOpportunities = res.data.map((item: any) => item.newsId);
        setListIdSaved(listIdOpportunities || []);
        const urlGetListOpportunities = '/api/v1/news/bulk';
        const resListNewsOppertunities: INews = await api.fetchBulkNews(
          urlGetListOpportunities,
          listIdOpportunities,
        );
        setListNews(resListNewsOppertunities);
      };

      fetchIdWishlist();
    }, [user]),
  );

  const handleChangeScreen = (path: string, id?: string) => {
    console.log(props.navigation);
    console.log(path);
    console.log(id);
    let params = {};
    if (id) {
      params = {
        ...params,
        id,
      };
    }
    props.navigation.navigate({
      name: path,
      params: {
        screen: path,
        params,
      },
    });
  };

  const fetchUPostAddOrRemoveWishList = async (
    newsId: string,
    title: string,
  ): Promise<void> => {
    const params = {
      userId: user?.id,
      newsId,
      titleNews: title,
    };
    const res = await apiUniverse.fetchUPost(
      '/wish-list-item/add-or-remove',
      params,
    );
    
    const listId = res?.data?.map((item: any) => item.newsId) || [];
    console.log('listId = ', listId);
    setListIdSaved(listId);
    const urlGetListOpportunities = '/api/v1/news/bulk';
    const resListNewsOppertunities: INews = await api.fetchBulkNews(
      urlGetListOpportunities,
      listId,
    );
    console.log(resListNewsOppertunities)
    setListNews(resListNewsOppertunities);
  };

  return (
    <SafeAreaView
      style={{
        width: '100%',
        backgroundColor: '#000000',
        height: '100%',
      }}>
      {/* {
        listNews?.data && listNews?.data.length !== 0 ?
          <HeaderActions
            navigation={props.navigation}
          />
          : null
      } */}
      <Offset mb={20} />
      <TextTitle title="Збережені" location={'left'} />
      <Offset mb={20} />

      <View
        style={{
          width: '100%',
          paddingHorizontal: 8,
          // marginBottom: 50,
        }}>
        {listNews?.data && listNews?.data.length === 0 ? (
          <View style={styles.emptyListContainer}>
            <Text style={styles.emptyListText}>
              Упс, у тебе ще немає збережених можливостей
            </Text>
            <Offset mb={60} />
            <TouchableOpacity
              style={styles.emptyListBtnGoto}
              onPress={() =>
                handleChangeScreen(StackScreenBottomMenu.OpportunitiesMain)
              }>
              <Text style={styles.emptyListBtnGotoText}>
                Дослідити актуальні можливості
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={listNews?.data ?? []}
            ref={listRef}
            keyExtractor={item => item.id}
            renderItem={({item}: any) => (
              <CardOpportunities
                remove
                item={item}
                isSaved={listIdSaved.includes(item.id)}
                handleAddOrRemoveWishlist={fetchUPostAddOrRemoveWishList}
                handleChangeScreen={handleChangeScreen}
                pathToScreen={WishlistPath.WISHLIST_NEWS_DETAIL}
              />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default OpportunitiesWishlist;
