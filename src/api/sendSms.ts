import axios from 'axios';
import {baseApiUrl} from './config';
import {Response} from './types/response.interface';
import {SendSmsResponse} from './types/send-sms.response';

export async function sendSms(
  email: string,
): Promise<Response<SendSmsResponse>> {
  const data = {
    email: email,
  };

  try {
    const response = await axios.post(
      `${baseApiUrl}/reset-password/send-code`,
      data,
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
