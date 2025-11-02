import axios from 'axios';
import {baseApiUrl} from './config';
import {ResetPasswordResponse} from './types/reset-password.response';
import {Response} from './types/response.interface';

export async function resetPassword(
  password: string,
  reset_token: string,
): Promise<Response<ResetPasswordResponse>> {
  try {
    const response = await axios.put(`${baseApiUrl}/reset-password/`, {
      password,
      reset_token,
    });

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
