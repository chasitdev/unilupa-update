import axios from 'axios';
import {baseApiUrl} from './config';
import {CheckCodeResponse} from './types/check-code.response';
import {Response} from './types/response.interface';

export async function checkCode(
  email: string,
  code: string,
): Promise<Response<CheckCodeResponse>> {
  try {
    const response = await axios.get(
      `${baseApiUrl}/reset-password/check-code/${email}/${code}`,
      {},
    );

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
