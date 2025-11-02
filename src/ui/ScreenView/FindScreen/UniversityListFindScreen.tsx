import {baseApiUrl} from '@api/config';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import {HomeScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {icon} from 'src/assets/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {UniversityInterface} from '../MainScreen/interfaces/university.interface';

interface Props {
  navigation: Navigation;
  search: string;
  sort: string;
}

const UniversityListFindScreen: React.FC<Props> = ({
  navigation,
  search,
  sort,
}) => {
  const [authToken, setAuthToken] = useState('');
  const [universities, setUniversities] = useState<UniversityInterface[]>([]);
  const [filteredAndSortedUniversities, setFilteredAndSortedUniversities] =
    useState<UniversityInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const token = await AsyncStorage.getItem(StorageEnum.accessToken);
      if (token) {
        setAuthToken(token);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    setSearchQuery(search.toLowerCase());
  }, [search]);

  useEffect(() => {
    async function fetchUniversities() {
      if (!authToken) {
        console.error('No authToken provided');
        return;
      }

      try {
        const savedResponse = await axios.get(
          `${baseApiUrl}/users/all-saved-universities?page=1&pageSize=5`,
          {
            headers: {Authorization: `Bearer ${authToken}`},
          },
        );

        const savedIds = new Set(
          savedResponse.data.universities.map((uni: any) => uni.id),
        );

        const allResponse = await axios.get(`${baseApiUrl}/university/all`, {
          headers: {Authorization: `Bearer ${authToken}`},
        });

        const universitiesWithSaveStatus = allResponse.data.map((uni: any) => ({
          ...uni,
          isSaved: savedIds.has(uni.id),
        }));

        setUniversities(universitiesWithSaveStatus);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    }

    if (authToken) {
      fetchUniversities();
    }
  }, [authToken]);

  useEffect(() => {
    function applyFiltersAndSort() {
      let results = universities.filter(uni =>
        uni.shortName.toLowerCase().includes(searchQuery),
      );

      switch (sort) {
        case 'costMin':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'costMax':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'distanceMin':
          // Distance
          break;
        case 'distanceMax':
          // Distance
          break;
        case 'nameA':
          results.sort((a, b) => a.shortName.localeCompare(b.shortName));
          break;
        case 'nameZ':
          results.sort((a, b) => b.shortName.localeCompare(a.shortName));
          break;
        default:
          results.sort((a, b) => a.shortName.localeCompare(b.shortName));
          break;
      }
      setFilteredAndSortedUniversities(results);
    }

    if (universities.length > 0 && authToken) {
      applyFiltersAndSort();
    }
  }, [sort, universities, searchQuery, authToken]);
  const renderStars = (rating: any) => {
    const totalStars = 5;
    const fullStars = Math.floor(rating);
    const noStars = totalStars - fullStars;
    const stars = [];
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Image key={`fs-${i}`} source={icon.yellowStar} style={styles.star} />,
      );
    }
    for (let i = 0; i < noStars; i++) {
      stars.push(
        <Image key={`ns-${i}`} source={icon.greyStar} width={10} height={10} />,
      );
    }
    return <View style={styles.ratingContainer}>{stars}</View>;
  };
  const toggleUniversitySave = async (universityId: any) => {
    const university = universities.find(u => u.id === universityId);
    if (!university) return;

    const endpoint = university.isSaved
      ? `${baseApiUrl}/users/delete-university`
      : `${baseApiUrl}/users/add-university`;

    try {
      await axios.post(
        endpoint,
        {universityId},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        },
      );
      const updatedUniversities = universities.map(u =>
        u.id === universityId ? {...u, isSaved: !u.isSaved} : u,
      );
      setUniversities(updatedUniversities);
    } catch (error) {
      console.error('Error processing university save:', error);
    }
  };

  return (
    <FlatList
      data={filteredAndSortedUniversities}
      renderItem={({item}) => (
        <TouchableOpacity
          style={styles.item}
          onPress={() =>
            navigation.navigate({
              name: StackScreenBottomMenu.HOME,
              params: {
                screen: HomeScreen.UNIVERSITY_INFORMATION,
                params: {university: item},
              },
            })
          }>
          <TouchableOpacity
            onPress={() => toggleUniversitySave(item.id)}
            style={styles.saveButton}>
            <Image
              source={item.isSaved ? icon.noSavedIcon : icon.savedIcon}
              width={18}
              height={18}
            />
          </TouchableOpacity>
          <Image
            source={{
              uri:
                item.logo ||
                'https://upload.wikimedia.org/wikipedia/commons/c/cd/University-of-Alabama-EngineeringResearchCenter-01.jpg',
            }}
            style={styles.image}
          />
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{item.shortName}</Text>
            <Text style={styles.details}>{item.adress}</Text>
            <Text style={styles.price}>{item.price || 0} грн/рік</Text>
            <View style={styles.ratingPosition}>
              {renderStars(item.rating)}
              <Text style={styles.ratingText}> ({item.rating})</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.button}>
            <Image source={icon.universityArrow} width={24} height={24} />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    backgroundColor: '#202026',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 15,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#3D3B3E',
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-between',
    position: 'relative',
    marginBottom: 5,
    marginTop: 5,
    marginLeft: 3,
    gap: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: 'white',
  },
  details: {
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 16,
    color: '#91939F',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 19,
    color: 'white',
    paddingBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingPosition: {
    position: 'absolute',
    top: 0,
    right: -30,
    flexDirection: 'row',
  },
  ratingText: {
    marginLeft: 4,
    color: '#91939F',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 14,
  },
  saveButton: {
    position: 'absolute',
    left: 15,
    top: 15,
    zIndex: 1,
    backgroundColor: 'white',
    padding: 1,
    borderRadius: 50,
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#0E46F1',
    padding: 1,
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginBottom: 5,
    marginRight: 5,
  },
  star: {
    width: 12,
    height: 12,
  },
});

export default UniversityListFindScreen;
