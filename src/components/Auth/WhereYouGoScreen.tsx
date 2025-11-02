import {baseApiUrl} from '@api/config';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import ToggleButton from '../../ui/Buttons/Toogle';
import HappyMainImage from '../../ui/ScreenView/Where You Go Screen/HappyMainImage';
import NextButton from '../../ui/ScreenView/Where You Go Screen/NextButton';
import NotThisYearCheckBox from '../../ui/ScreenView/Where You Go Screen/NotThisYearCheckBox';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import TextTitle from 'src/ui/Text/TextTitle';

interface Props {
  navigation: Navigation;
}

const WhereYouGoScreen: React.FC<Props> = props => {
  const [isNotThisYearChecked, setIsNotThisYearChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string>('Університет');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

        const response = await axios.get(`${baseApiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const educationInstitution = response.data.educationInstitution;
        setSelectedValue(educationInstitution || 'Університет');
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  const handleSelectToggle = (value: string) => {
    setIsNotThisYearChecked(false);
    setSelectedValue(value);
  };

  const handleToggleNotifications = () => {
    setIsNotThisYearChecked(!isNotThisYearChecked);
  };

  const handleNextPress = async () => {
    try {
      const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

      const response = await axios.put(
        `${baseApiUrl}/users`,
        {
          educationInstitution: selectedValue,
          noThisYearEntering: isNotThisYearChecked,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      if (response.status === 200 || response.status === 201) {
        props.navigation.navigate({
          name: StackScreenBottomMenu.AUTHORIZATION,
          params: {
            screen: AuthorizationScreen.CHOOSE_EDUCATION,
          },
        });
      } else {
        throw new Error('Сталась помилка при збереженні');
      }
    } catch (error) {
      console.error('Error sending data:', error);
      Alert.alert('Error', 'Failed to save data');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textImageToogle}>
        <TextTitle title={'Куди ти вступаєш цього року?'} />
        <HappyMainImage />
        <ToggleButton
          options={[
            {label: 'Університет', value: 'Університет'},
            {label: 'Коледж', value: 'Коледж'},
          ]}
          selectedValue={selectedValue}
          onSelect={handleSelectToggle}
        />
      </View>
      <View style={styles.buttons}>
        <NotThisYearCheckBox
          isActive={isNotThisYearChecked}
          onToggle={handleToggleNotifications}
        />
        <NextButton onPress={handleNextPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    padding: 32,
  },
  buttons: {
    marginTop: 16,
    gap: 32,
    width: '100%',
    alignItems: 'center',
  },
  textImageToogle: {
    marginTop: 64,
    gap: 16,
    width: '100%',
  },
});

export default WhereYouGoScreen;
