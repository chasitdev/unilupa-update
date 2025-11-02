import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {baseApiUrl} from './config';
import {Response} from './types/response.interface';
import {UniversityInterface} from 'src/ui/ScreenView/MainScreen/interfaces/university.interface';

export async function saveUniversity(
  universityId: string,
): Promise<Response<UniversityInterface[]>> {
  try {
    const data = {
      universityId,
    };

    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);
    const response = await axios.post(
      `${baseApiUrl}/users/add-university`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return {
      data: response.data.universities,
      statusCode: response.status,
      success: true,
    };
  } catch (error: any) {
    // console.log(error.message);
    return {
      data: null,
      statusCode: error.response.status || 0,
      success: false,
    };
  }
}
