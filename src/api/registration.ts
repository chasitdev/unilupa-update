import axios from 'axios';
import {baseApiUrl} from './config';
import {RegistrationResponse} from './types/registration.response';
import {Response} from './types/response.interface';

export async function registration(
  email: string,
  password: string,
  userType: 0 | 1, // 0 - regular
  signData?: SignData,
): Promise<Response<RegistrationResponse>> {
  const data = {
    email: email,
    password: password,
    user_type: userType,
    ...signData,
  };

  try {
    const response = await axios.post(`${baseApiUrl}/auth/signup/email`, data);
    // // console.log('Response:', response.data);
    return {
      data: response.data,
      statusCode: response.status,
      success: true,
    };
  } catch (error: any) {
    // console.log(error);
    return {
      data: null,
      statusCode: error.response.status || 0,
      success: false,
    };
  }
}

export interface SignData {
  first_name: string;
  last_name: string;
  title: string;
  practise_name: string;
}
