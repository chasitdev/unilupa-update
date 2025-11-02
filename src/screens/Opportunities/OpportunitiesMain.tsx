import {Navigation} from 'src/navigation/types/navigation.type';
import SearchBarFindScreen from '../../ui/ScreenView/FindScreen/SearchBarFindScreen';
import React, {useCallback, useEffect, useState} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, TouchableOpacity, View} from 'react-native';
import {api, apiUniverse} from '@api/api';
import {
  IClassificationNews,
  ITypesNews,
  INews,
  ITypes,
  IClassification,
  IOneNews,
} from './interface/opportunities.interface';
import Offset from '../../ui/Offset/Offset';
import {
  defaultOpportunitiesFilters,
  IDefaultOpportunitiesFilters,
} from 'src/types/filter.type';
import {StackScreenBottomMenu} from 'src/types/screens.type';
import {styles} from './styles/opportunities-main-styles';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import useAuth from 'src/hooks/auth/useAuth';
import FilterOpportunatiesModalScreen from '../MainScreen/ModalScreen/FilterOpportunatiesModalScreen';
import RecommendationSlider from 'src/components/Sliders/RecommendationSlider';
import TextCustom from 'src/ui/Text/TextCustom';
import ButtonColorBiggest from 'src/ui/Buttons/ButtonColorBiggest';
import {icon} from 'src/assets/icons';
import {CustomLine} from 'src/ui/Line/CustomLine';
import {CardOpportunities} from 'src/ui/Cardss/CardOpportunities/CardOpportunities';
import HeaderActions from 'src/ui/DetailHeaderActions/HeaderActions';

interface Props {
  // navigation: Navigation;
}

interface IrecommendationNews {}
const OpportunitiesMain: React.FC<Props> = () => {
  const navigation = useNavigation<Navigation>();
  const [searchText, setSearchText] = useState('');
  const [listRecommendation, setListRecommendation] = useState<
    IrecommendationNews[]
  >([]);
  const [amountRecommendation, setAmountRecommendation] = useState(0);
  const [page, setPage] = useState(1);
  const [filterModal, setFilterModal] = useState(false);
  const [listNews, setListNews] = useState<INews | null>(null);
  const [listIdSaved, setListIdSaved] = useState<string[]>([]);
  const [listTypesNews, setLisTypesNews] = useState<ITypesNews[] | []>([]);
  const [lisClassificationNews, setLisClassificationNews] = useState<
    IClassificationNews[] | []
  >([]);
  const [filter, setFilter] = useState<IDefaultOpportunitiesFilters>(
    defaultOpportunitiesFilters,
  );
  const listRef = React.useRef<FlatList>(null);
  const [previewListFilters, setPreviewListFilters] = useState<string[]>([]);
  const {user} = useAuth();

  const getDataNews = async function (params = {}) {
    const options = {
      ...filter,
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
  };

  // get recommendation list
  useEffect(() => {
    const getDataRecommendation = async function () {
      const res: INews = await api.fetchNews('/api/v1/news/');
      setAmountRecommendation(res.meta.total);
      setListRecommendation(res.data);
    };
    getDataRecommendation();
  }, []);
  // get list  news
  useEffect(() => {
    getDataNews({
      ...filter,
      page: 1,
      page_size: 5,
    });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // get types news list
  useEffect(() => {
    const getTypes = async function () {
      const res: ITypes = await api.fetchTypesNews('/api/v2/types/');
      setLisTypesNews(res.data);
    };
    getTypes();
  }, []);
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

  const handleApplyFilter = (f = {}) => {
    scrollToTop();
    getDataNews({
      ...f,
      page: 1,
      page_size: 5,
    });
    setPage(1);
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
    setListIdSaved(res?.data?.map((item: any) => item.newsId) || []);
  };

  const handleChangeScreenDetailCard = (path: string, id: string) => {
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

  const handleChangeScreen = (path: string) => {
    navigation.navigate({
      name: path,
      params: {
        screen: path,
      },
    });
  };

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({animated: true, offset: 0});
  };

  const serializerPreviewFilter = (f: IDefaultOpportunitiesFilters) => {
    let newFilter = f;
    if (f.country || f.city || f.region) {
      newFilter = {
        ...f,
        country: null,
        city: null,
        region: null,
        location: 'По розташуванню',
      };
    }
    return newFilter;
  };

  useEffect(() => {
    const filters =
      Object.values(serializerPreviewFilter(filter))
        ?.flatMap(value => {
          if (value === null || value === undefined) return [];
          if (Array.isArray(value)) return value.length ? value : [];
          return [value];
        })
        ?.filter(
          v =>
            v !== null &&
            v !== undefined &&
            (!Array.isArray(v) || v.length > 0),
        ) ?? [];
    setPreviewListFilters(filters);
  }, [filter]);

  const clearFilters = function () {
    setPreviewListFilters([]);
    setFilter(defaultOpportunitiesFilters);
    setListNews(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ref={listRef}
        data={listNews?.data ?? []}
        keyExtractor={item =>
          `${item.id}-${Math.random().toString(36).substr(2, 5)}`
        }
        renderItem={({item}: {item: IOneNews}) => (
          <>
            {!!previewListFilters.length && (
              <CardOpportunities
                item={item}
                isSaved={listIdSaved.includes(item.id)}
                handleChangeScreen={handleChangeScreenDetailCard}
                handleAddOrRemoveWishlist={fetchUPostAddOrRemoveWishList}
                pathToScreen={StackScreenBottomMenu.OpportunitiesDetail}
              />
            )}
          </>
        )}
        onEndReached={() => {
          !filterModal && getDataNews({page});
        }}
        onEndReachedThreshold={1}
        ListHeaderComponent={
          <View style={styles.wrap}>
            <SearchBarFindScreen
              navigation={navigation}
              onChange={(text: string) => setSearchText(text)}
              handleOpenFiltersModal={() => setFilterModal(true)}
              handleChangeScreen={handleChangeScreen}
              handleBack={
                !!previewListFilters.length ? clearFilters : undefined
              }
            />
            <Offset mb={20} />
            <FilterOpportunatiesModalScreen
              open={filterModal}
              onClose={() => setFilterModal(false)}
              handleApplyFilter={handleApplyFilter}
              typesNews={listTypesNews}
              classificationsNews={lisClassificationNews}
              filter={filter}
              setFilter={setFilter}
            />

            {!!previewListFilters.length && (
              <View>
                {/* горизонтальный список фильтров */}
                <FlatList
                  data={previewListFilters}
                  keyExtractor={(item, index) => `${item}-${index}`}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.containerHorizontalFilters}
                  renderItem={({item}) => (
                    <View style={styles.noticeFilter}>
                      <TextCustom style={styles.notice}>{item}</TextCustom>
                    </View>
                  )}
                />
                <Offset mb={10} />
                <CustomLine color={'#363535ff'} />
                <Offset mb={10} />
                {/* <Offset mt={20} /> */}
              </View>
            )}

            {/* --- Кнопки фильтров --- */}
            {!!!previewListFilters.length && (
              <>
                <View style={styles.btnsContainerBiggest}>
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['гранти']});
                      setPreviewListFilters(['гранти']);
                    }}
                    title="Гранти"
                    desc="47 можливостей"
                    gradient={['#1B6EFD', '#1E2D68']}
                    directionGradient="to-right"
                    sourceImage={icon.capKnowledge}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Стажування']});
                      setPreviewListFilters(['Стажування']);
                    }}
                    title="Стажування"
                    desc="23 можливості"
                    gradient={['#371E68', '#1BFDAE']}
                    directionGradient="to-right"
                    sourceImage={icon.case}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Спорт']});
                      setPreviewListFilters(['Спорт']);
                    }}
                    title="Спорт"
                    desc="31 можливість"
                    gradient={['#1BFDB2', '#25681E']}
                    directionGradient="to-right"
                    sourceImage={icon.runPeople}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Стартапи']});
                      setPreviewListFilters(['Стартапи']);
                    }}
                    title="Стартапи"
                    desc="15 можливостей"
                    gradient={['#21BD3E', '#6B245D']}
                    directionGradient="to-right"
                    sourceImage={icon.racket}
                  />
                </View>
                <View style={styles.btnsContainerBiggest}>
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Обміни']});
                      setPreviewListFilters(['Обміни']);
                    }}
                    title="Обміни"
                    desc="31 можливість"
                    gradient={['#FF00C8', '#420B8F']}
                    directionGradient="to-right"
                    sourceImage={icon.people}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Події']});
                      setPreviewListFilters(['Події']);
                    }}
                    title="Події"
                    desc="15 можливостей"
                    gradient={['#811BFD', '#61681E']}
                    directionGradient="to-right"
                    sourceImage={icon.cup}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['IT']});
                      setPreviewListFilters(['IT']);
                    }}
                    title="IT"
                    desc="47 можливостей"
                    gradient={['#F2FF00', '#0B8F80']}
                    directionGradient="to-right"
                    sourceImage={icon.computer}
                  />
                  <ButtonColorBiggest
                    onPress={() => {
                      handleApplyFilter({...filter, type: ['Культура']});
                      setPreviewListFilters(['Культура']);
                    }}
                    title="Культура"
                    desc="23 можливості"
                    gradient={['#49C726', '#1B639E']}
                    directionGradient="to-right"
                    sourceImage={icon.point}
                  />
                </View>

                {/* <Offset mt={30} />
                <TextCustom fontSize={24} fontWeight="600">
                  Найближчі до тебе
                </TextCustom>
                <TextCustom fontWeight="600">??????????</TextCustom>
                <CustomLine />
                <Offset mt={20} /> */}

                {/* --- Блок: Реклама / Premium --- */}
                {/* <View style={styles.btnsContainerBiggest}>
                  <ButtonColorBiggest
                    onPress={() => console.log('click')}
                    title="Запроси друга"
                    desc="Отримай місяць Premium безкоштовно за кожного запрошеного друга!"
                    gradient={['#1B6EFD', '#1E2D68']}
                    directionGradient="to-right"
                    sourceImage={icon.gift}
                    styleTitle={{
                      position: 'absolute',
                      top: -30,
                      left: 40,
                      fontSize: 20,
                    }}
                  />
                </View> */}

                {/* <View style={styles.btnsContainerBiggest}>
                  <ButtonColorBiggest
                    onPress={() => console.log('click')}
                    title="Унілупа Premium"
                    desc="Безлімітні можливості, завдання та ранній доступ до нових функцій"
                    gradient={['#8800FF', '#520B8F']}
                    directionGradient="to-right"
                    sourceImage={icon.gift}
                    styleTitle={{
                      position: 'absolute',
                      top: -30,
                      left: 40,
                      fontSize: 20,
                    }}
                  />
                </View> */}
              </>
            )}

            {/* --- Блок: Рекомендации --- */}
            {!!!previewListFilters.length && !!listRecommendation.length && (
              <>
                <Offset mt={20} />
                <TextCustom fontSize={24} fontWeight="600">
                  Рекомендовані для тебе {'\n'} {amountRecommendation}{' '}
                  можливостей 😱
                </TextCustom>
                <Offset mt={20} />
                <RecommendationSlider
                  dataRecommendationList={listRecommendation as INews[]}
                  navigation={navigation}
                  variant="opportunities"
                  onPress={handleChangeScreenDetailCard}
                />
              </>
            )}
          </View>
        }
        ListFooterComponent={<Offset mb={120} />}
      />

      {/* Кнопка добавить */}
      <TouchableOpacity
        style={styles.btnAddOpportunities}
        onPress={() =>
          handleChangeScreen(StackScreenBottomMenu.OpportunitiesAddedUser)
        }>
        <Text style={styles.textAddOpportunities}>+</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OpportunitiesMain;
