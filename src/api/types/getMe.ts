import {baseApiUrl} from '@api/config';
import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {Response} from './response.interface';
import {UserInterface} from './user.interface';

export async function getMe(): Promise<Response<UserInterface>> {
  try {
    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);
    // console.log(accessToken);

    if (!accessToken) {
      throw new Error('Access token is not found!');
    }
    // console.log(`${baseApiUrl}/users/me`);

    const response = await axios.get(`${baseApiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return {
      data: response.data.user,
      statusCode: response.status,
      success: true,
    };
  } catch (error: any) {
    console.log(error);
    return {
      data: null,
      statusCode: error.response.status || 0,
      success: false,
    };
  }
}
