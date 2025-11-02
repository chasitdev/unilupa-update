import {baseApiUrl} from '@api/config';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import HeaderTextWelcomeScreen from '../../ui/ScreenView/Welcome screen/HeaderText';
import MainImage from '../../ui/ScreenView/Welcome screen/MainImage';
import ProfileSetupButton from '../../ui/ScreenView/Welcome screen/ProfileSetupButton';
import {AuthorizationScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

interface Props {
  navigation: Navigation;
}

const WelcomeScreen: React.FC<Props> = props => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

        const response = await axios.get(`${baseApiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        // console.log('User data:', response.data);
        setUserName(response.data.user.fullname);
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Alert.alert('Error', 'Failed to fetch user data');
      }
    };

    fetchUserData();
  }, []);

  // console.log('username', userName);
  return (
    <View style={styles.container}>
      <HeaderTextWelcomeScreen username={userName} />
      <MainImage />
      <View style={styles.buttonContainer}>
        <ProfileSetupButton
          onPress={() => {
            props.navigation.navigate({
              name: StackScreenBottomMenu.AUTHORIZATION,
              params: {
                screen: AuthorizationScreen.WHERE_YOU_GO,
              },
            });
          }}
        />
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
    gap: 32,
  },
  buttonContainer: {
    gap: 16,
    alignItems: 'center',
    width: '100%',
  },
});

export default WelcomeScreen;
