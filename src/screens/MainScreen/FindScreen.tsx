import SearchBarFindScreen from '../../ui/ScreenView/FindScreen/SearchBarFindScreen';
import UniversityList from '../../ui/ScreenView/MainScreen/UniversityList';
import TextCustom from '../../ui/Text/TextCustom';
import useUniversityContext from 'src/hooks/university/useUnversityContext';
import React, {useEffect, useState} from 'react';
import {
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RecommendationSlider from '../../components/Sliders/RecommendationSlider';
import useAuth from 'src/hooks/auth/useAuth';
// import {Navigation} from 'src/navigation/types/navigation.type';
import {FilterInterface} from 'src/types/filter.type';
import {UniversityInterface} from 'src/ui/ScreenView/MainScreen/interfaces/university.interface';
import {CityType} from 'src/types/city.enum';
import {icon} from 'src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import FilterUniversityModalScreen from './ModalScreen/FilterUniversityModalScreen';

interface Props {
  // navigation: Navigation;
}

const FindScreen: React.FC<Props> = props => {
  // const navigation = props.navigation;
  const navigation = useNavigation<any>();

  const [filter, setFilter] = useState<FilterInterface>({
    sort: '',
    locations: ['Вся Україна'],
    speciality: [],
    priceRange: [0, 400000],
    studyMode: 'всі',
    budgetPlacesAvailable: 'Всі',
    percentRange: [0, 100],
    hostelCost: [0, 10000],
    education: 'Всі',
  });

  const [filterModal, setFilterModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const universContext = useUniversityContext();
  const [filteredUniversities, setFilteredUniversities] =
    useState<UniversityInterface[]>();

  const {user} = useAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      Keyboard.dismiss();
    }, 3000);

    return () => clearTimeout(timer);
  }, [searchText]);

  const applyFilter = (newFilter: any) => {
    setFilter(newFilter);
    setFilterModal(false);
  };

  useEffect(() => {
    const filtered = universContext.universities
      .filter(univer => {
        if (filter.education === 'Всі') {
          return true;
        }

        return univer.educationalLevel?.includes(filter.education);
      })
      .filter(
        univer =>
          filter.studyMode == 'всі' ||
          univer.educationForms.includes(filter.studyMode) ||
          univer.educationForms.length <= 0,
      )
      .filter(
        univer =>
          filter.budgetPlacesAvailable == 'Всі' ||
          filter.budgetPlacesAvailable == 'Ні' ||
          (filter.budgetPlacesAvailable == 'Так' &&
            univer.budgetSeatsCount &&
            univer.budgetSeatsCount > 0),
      )
      .filter(univer => univer.price >= filter.priceRange[0])
      .filter(univer => univer.price <= filter.priceRange[1])
      .filter(univer => {
        if (
          filter.locations.length <= 0 ||
          filter.locations.includes('Вся Україна')
        ) {
          return true;
        }

        return filter.locations.includes(univer.district);
      })
      .filter(univer => {
        if (filter.speciality.length <= 0) {
          return true;
        }

        return filter.speciality.some(speciality =>
          univer.specialityCodes?.some((code: any) => code === speciality),
        );
      })
      .filter((univer: any) => {
        return (
          univer.fullName?.toLowerCase().includes(searchText.toLowerCase()) ||
          univer.shortName?.toLowerCase().includes(searchText.toLowerCase())
        );
      });

    setFilteredUniversities(filtered);
  }, [filter, searchText, universContext]);

  if (!filteredUniversities) {
    return null;
  }

  const recommendedUniversities = universContext.universities
    .filter(univer => {
      if (user?.city?.includes(CityType.ALL) || !user?.city) {
        return true;
      }

      return user?.city?.includes(univer.district);
    })
    .filter(univer => {
      if (!user?.specialities || user?.specialities?.length <= 0) {
        return true;
      }
      return user?.specialities.some(speciality =>
        univer.specialityCodes?.some((code: any) => code === speciality),
      );
    });

  const handleChangeScreen = (path: string) => {
    navigation.navigate({
      name: path,
      params: {
        screen: path,
      },
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      {universContext.comparisonUniversities.length > 0 && (
        <TouchableOpacity
          style={styles.topButton}
          onPress={() => {
            props.navigation.navigate('ComparisonScreen');
          }}>
          <Image source={icon.comparisonIcon} style={styles.icon} />
          <View
            style={{
              backgroundColor: 'white',
              width: 20,
              height: 20,
              alignContent: 'center',
              justifyContent: 'center',
              borderRadius: 50,
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            <TextCustom fontSize={14} textAlign="center" color="#0E46F1">
              {universContext.comparisonUniversities.length}
            </TextCustom>
          </View>
        </TouchableOpacity>
      )}
      <View
        style={{
          width: '100%',
          paddingHorizontal: 8,
        }}>
        <SearchBarFindScreen
          navigation={navigation}
          onChange={(text: string) => {
            setSearchText(text);
          }}
          handleOpenFiltersModal={() => {
            setFilterModal(true);
          }}
          handleChangeScreen={handleChangeScreen}
        />

        <View
          style={{
            width: '100%',
            height: '100%',
            marginTop: 16,
          }}>
          <UniversityList
            showAd
            navigation={navigation}
            initialUniversities={filteredUniversities || []}
            header={
              <>
                <View style={styles.listText}>
                  <TextCustom
                    fontSize={20}
                    fontWeight="600"
                    lineHeight={24}
                    color="white">
                    Рекомендовані для тебе
                  </TextCustom>
                </View>

                <RecommendationSlider
                  dataRecommendationList={
                    recommendedUniversities
                      .sort((a, b) => b.rating - a.rating)
                      .slice(0, 4) as unknown as UniversityInterface[]
                  }
                  variant="university"
                  navigation={navigation}
                />

                <View style={styles.listText}>
                  <TextCustom
                    fontSize={20}
                    fontWeight="600"
                    lineHeight={24}
                    color="#DEDEDEFF">
                    Всього:
                  </TextCustom>

                  <TextCustom
                    fontSize={20}
                    fontWeight="600"
                    lineHeight={24}
                    color="#DEDEDEFF">
                    {' '}
                    {filteredUniversities?.length}
                  </TextCustom>
                </View>
              </>
            }
            // sortMethod={sort}
          />
        </View>

        {filteredUniversities?.length < 1 && (
          <View style={styles.view}>
            <TextCustom color="white" textAlign="center">
              {'За вашим запитом\nне знайдено жодного закладу'}
            </TextCustom>
          </View>
        )}

        <FilterUniversityModalScreen
          open={filterModal}
          onClose={() => setFilterModal(false)}
          applyFilter={applyFilter}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  },
  topButton: {
    backgroundColor: '#0E46F1',
    width: 52,
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    position: 'absolute',
    bottom: 16,
    right: 16,
    zIndex: 2000,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'black',
    gap: 10,
  },

  sort: {
    marginTop: 10,
    zIndex: 2000,
  },

  listText: {
    marginBottom: 10,
    flexDirection: 'row',
  },
  sortText: {
    marginBottom: 15,
    marginLeft: 16,
  },
  scrollContainer: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  view: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FindScreen;
