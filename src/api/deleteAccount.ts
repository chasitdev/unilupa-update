import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseApiUrl} from './config';
import {Response} from './types/response.interface';

export async function deleteAccount(): Promise<Response<null>> {
  try {
    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);

    const response = await axios.delete(`${baseApiUrl}/users/remove`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return {
      data: null,
      statusCode: response.status,
      success: true,
    };
  } catch (error: any) {
    console.log(error.message);
    return {
      data: null,
      statusCode: error.response.status || 0,
      success: false,
    };
  }
}
