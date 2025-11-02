import axios from 'axios';
import {baseApiUrl} from './config';
import {LoginResponse} from './types/login.response';
import {Response} from './types/response.interface';

export async function signIn(
  email: string,
  password: string,
  remember: 0 | 1,
): Promise<Response<LoginResponse>> {
  const data = {
    email: email,
    password: password,
    remember: remember,
  };

  try {
    const response = await axios.post(`${baseApiUrl}/auth/signin/email`, data);

    return {
      data: response.data,
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
