import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import TextTitle from 'src/ui/Text/TextTitle';
import HappyMainImage from 'src/ui/ScreenView/Where You Go Screen/HappyMainImage';
import ToggleButton from 'src/ui/Buttons/Toogle';
import NotThisYearCheckBox from 'src/ui/ScreenView/Where You Go Screen/NotThisYearCheckBox';
import SaveButton from 'src/ui/ScreenView/Location Settings Screen/SaveButton';

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {test: string}>, 'key'>;
}

const WhereYouGoScreenSettings: React.FC<Props> = props => {
  const [isNotThisYearChecked, setIsNotThisYearChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const {user, setInstitution} = useAuth();

  useEffect(() => {
    if (user?.educationInstitution) {
      setSelectedValue(user?.educationInstitution);
    }
  }, [user]);

  const handleSelectToggle = (value: string) => {
    setIsNotThisYearChecked(false);
    setSelectedValue(value);
  };

  const handleToggleNotifications = () => {
    const shouldDisableToggle = !isNotThisYearChecked;
    setIsNotThisYearChecked(shouldDisableToggle);
    if (shouldDisableToggle) {
      setSelectedValue(null);
    }
  };
  const handleNextPress = async () => {
    try {
      const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

      const response = await axios.put(
        `${baseApiUrl}/users`,
        {
          educationInstitution: selectedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        setInstitution(selectedValue);
        props.navigation.goBack();
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
        <SaveButton onPress={handleNextPress} />
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

export default WhereYouGoScreenSettings;
