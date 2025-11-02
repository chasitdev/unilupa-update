import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import HeaderTextLocationScreen from '../../ui/ScreenView/LocationScreen/HeaderText';
import LocationButton from '../../ui/ScreenView/LocationScreen/LocationButton';
import RegionButton from '../../ui/ScreenView/LocationScreen/RegionButton';
import SkipButtonLocation from '../../ui/ScreenView/LocationScreen/SkipButtonLocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

const regions = [
  'Вся Україна',
  'м. Київ',
  'Львівська',
  'Вінницька',
  'Волинська',
  'Дніпропетровська',
  'Рівненська',
  'Миколаївська',
  'Донецька',
  'Одеська',
  'Житомирська',
  'Закарпатська',
  'Запорізька',
  'Івано-Франківська',
  'Київська',
  'Кіровоградська',
  'Луганська',
  'Полтавська',
  'Сумська',
  'Тернопільська',
  'Харківська',
  'Черкаська',
  'Херсонська',
  'Хмельницька',
  'Чернівецька',
  'Чернігівська',
];

interface Props {
  navigation: Navigation;
}

const LocationScreen: React.FC<Props> = props => {
  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const auth = useAuth();

  const handleLocationSubmit = async () => {
    try {
      const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

      const response = await axios.post(
        `${baseApiUrl}/users/city`,
        {
          city: selectedRegion,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      auth.authorization();
    } catch (error) {
      console.error('Failed to update city:', error);
      Alert.alert('Error', 'Failed to update city');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.regions}>
          <HeaderTextLocationScreen />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.buttonContainer}>
            {regions.map(region => (
              <RegionButton
                key={region}
                title={region}
                onPress={() => setSelectedRegion(region)}
                isSelected={selectedRegion === region}
              />
            ))}
          </ScrollView>
          <View style={styles.buttons}>
            <LocationButton onPress={handleLocationSubmit} />
            <SkipButtonLocation
              onPress={() => {
                auth.authorization();
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  scrollView: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 5,
  },
  buttons: {
    alignItems: 'center',
    gap: 25,
    marginBottom: 10,
  },
  regions: {
    gap: 20,
    marginTop: 10,
  },
});

export default LocationScreen;
