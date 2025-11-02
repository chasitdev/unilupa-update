import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import {CityType} from 'src/types/city.enum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {icon} from 'src/assets/icons';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderTextLocationScreen from 'src/ui/ScreenView/LocationScreen/HeaderText';
import RegionButton from 'src/ui/ScreenView/LocationScreen/RegionButton';
import SaveButton from 'src/ui/ScreenView/Location Settings Screen/SaveButton';

const regions: CityType[] = [
  CityType.ALL,
  CityType.KYIV,
  CityType.LVIVSKA,
  CityType.VINNYTSKA,
  CityType.VOLYNSKA,
  CityType.DNIPROPETROVSKA,
  CityType.RIVNENSKA,
  CityType.MYKOLAIVSKA,
  CityType.DONETSKA,
  CityType.ODESSKA,
  CityType.ZHYTOMYRSKA,
  CityType.ZAKARPATSKA,
  CityType.ZAPORIZKA,
  CityType.IVANOFRANKIVSKA,
  CityType.KYIVSKA,
  CityType.KIROVOHRADSKA,
  CityType.LUHANSKA,
  CityType.POLTAVSKA,
  CityType.SUMSKA,
  CityType.TERNOPILSKA,
  CityType.KHARKIVSKA,
  CityType.CHERKASKA,
  CityType.KHERSONSKA,
  CityType.KHMELNYTSKA,
  CityType.CHERNIVETSKA,
  CityType.CHERNIGIVSKA,
];

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {test: string}>, 'key'>;
}

const LocationScreenSettings: React.FC<Props> = props => {
  const [selectedRegion, setSelectedRegion] = useState<CityType[]>([
    regions[0],
  ]);

  const {user, setCities} = useAuth();

  useEffect(() => {
    if (user?.city) {
      setSelectedRegion(user.city);
    }
  }, [user?.city]);

  if (!user) {
    return null;
  }

  const handleLocationSubmit = async () => {
    try {
      const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

      const response = await axios.put(
        `${baseApiUrl}/users`,
        {
          city: selectedRegion,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      console.log(response.data);
      setCities(selectedRegion);
    } catch (error) {
      console.error('Failed to update city:', error);
      Alert.alert('Error', 'Failed to update city');
    }
  };
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <View style={styles.regions}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image source={icon.backIcon} style={styles.icon} />
          </TouchableOpacity>
          <HeaderTextLocationScreen />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.buttonContainer}>
            {regions.map(region => (
              <RegionButton
                key={region}
                title={region}
                onPress={() => {
                  if (selectedRegion.includes(region)) {
                    setSelectedRegion(
                      selectedRegion.filter(item => item !== region),
                    );
                    return;
                  }

                  setSelectedRegion([...selectedRegion, region]);
                }}
                isSelected={selectedRegion.includes(region)}
              />
            ))}
          </ScrollView>
          <View style={styles.buttons}>
            <SaveButton
              onPress={() => {
                handleLocationSubmit();
                props.navigation.goBack();
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
  settingsButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default LocationScreenSettings;
