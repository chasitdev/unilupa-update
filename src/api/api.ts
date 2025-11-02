import {baseApiUrl, baseApiUrlNews} from './config';
import {API_URL_DOMAIN} from '@env';
import {Platform} from 'react-native';
import {
  INews,
  IOneNews,
  ICountries,
  ITypes,
  IClassification,
} from 'src/screens/Opportunities/interface/opportunities.interface';

const defaultHeaders = {
  accept: 'application/json',
};

export class Api {
  private host: string;
  private token?: string;

  constructor(host: string, token?: string) {
    this.host = host;
    this.token = token;
  }

  private getAuthHeaders = () => ({
    ...defaultHeaders,
    Authorization: `Bearer ${this.token}`,
  });

  private clearParams = (params?: Record<string, any>) => {
    if (!params) return {};

    const cleaned: Record<string, any> = {};

    Object.entries(params).forEach(([key, value]) => {
      const isNonEmptyArray = Array.isArray(value) && value.length > 0;
      const isNonEmptyObject =
        typeof value === 'object' &&
        !Array.isArray(value) &&
        value !== null &&
        Object.keys(value).length > 0;

      if (
        value !== undefined &&
        value !== null &&
        value !== '' &&
        (!Array.isArray(value) || isNonEmptyArray || isNonEmptyObject)
      ) {
        cleaned[key] = value;
      }
    });

    return cleaned;
  };

  private buildQueryString(params: Record<string, any>) {
    const esc = encodeURIComponent;
    return Object.keys(params)
      .map(k => `${esc(k)}=${esc(params[k])}`)
      .join('&');
  }

  async sendNewUserNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<any> {
    try {
      const clearParam = this.clearParams(params);
      const formData = new FormData();
      console.log({clearParam});

      for (const key of Object.keys(clearParam)) {
        if (key === 'files' && Object.keys(clearParam[key]).length > 0) {
          const uri = clearParam[key].uri;
          const name = uri.split('/').pop() ?? 'photo.jpg';
          const extension = name.split('.').pop()?.toLowerCase();
          const type = extension ? `image/${extension}` : 'image/jpeg';

          formData.append('files', {
            uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
            name,
            type,
          } as any);
        } else {
          formData.append(key, String(clearParam[key]));
        }
      }
      const response = await fetch(this.host + endpoint, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          ...(extraHeaders || {}),
          // Не указываем Content-Type вручную!
        },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        if (data.detail.length > 0) {
          return {error: data};
        }
        throw new Error('Ошибка отправки формы');
      }

      // console.log({data: data?.errors[0].detail.loc});
      // console.log({data: data?.errors[1].detail.loc});
      console.log({dataStatus: data?.status});
      if (data?.status === 'rejected') {
        return {error: data.errors};
      }
      return data;
    } catch (error) {
      console.error('Ошибка sendNewUserNews:', error);
      throw error;
    }
  }

  async fetchRegitUserNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<any> {
    try {
      const body = JSON.stringify(this.clearParams(params));

      const response = await fetch(this.host + endpoint, {
        method: 'POST',
        headers: {
          ...this.getAuthHeaders(),
          'Content-Type': 'application/json',
          ...(extraHeaders || {}),
        },
        body,
      });

      if (response.status === 409) {
        console.log('Користувач вже зареєстрований у новинній базі.');
        return;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Ошибка fetchRegitUserNews:', error);
      throw error;
    }
  }

  async fetchGetCountries(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<ICountries> {
    const query = this.buildQueryString(this.clearParams(params));
    const url = `${this.host + endpoint}?${query}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {...this.getAuthHeaders(), ...(extraHeaders || {})},
    });

    if (!response.ok) throw new Error('Не вдалося отримати список країн.');
    return response.json();
  }

  async fetchNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<INews> {
    const cleanedParams = this.clearParams(params);
    const query = this.buildQueryString(cleanedParams);
    const url = query
      ? `${this.host + endpoint}?${query}`
      : `${this.host + endpoint}`;

    const headers = {
      Accept: 'application/json',
      ...this.getAuthHeaders(),
      ...(extraHeaders || {}),
    };

    console.log({params: cleanedParams, url, headers});

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(
        'Fetch failed:',
        response.status,
        response.statusText,
        errorText,
      );
      throw new Error('Не вдалося отримати новини.');
    }

    return response.json();
  }

  async fetchBulkNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<INews> {
    const response = await fetch(this.host + endpoint, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
        ...(extraHeaders || {}),
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) throw new Error('Не вдалося отримати новость.');
    return response.json();
  }

  async fetchOneNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<IOneNews> {
    const response = await fetch(this.host + endpoint, {
      method: 'GET',
      headers: {...this.getAuthHeaders(), ...(extraHeaders || {})},
    });

    console.log({ddd: response});
    if (!response.ok) throw new Error('Не вдалося отримати одну новину.');
    return response.json();
  }

  async fetchTypesNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<ITypes> {
    const query = this.buildQueryString(this.clearParams(params));
    const url = `${this.host + endpoint}?${query}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {...this.getAuthHeaders(), ...(extraHeaders || {})},
    });

    if (!response.ok) throw new Error('Не вдалося отримати типу новини.');
    return response.json();
  }

  async fetchClassificationNews(
    endpoint: string,
    params?: Record<string, any>,
    extraHeaders?: Record<string, any>,
  ): Promise<IClassification> {
    const query = this.buildQueryString(this.clearParams(params));
    const url = `${this.host + endpoint}?${query}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {...this.getAuthHeaders(), ...(extraHeaders || {})},
    });

    if (!response.ok) throw new Error('Не вдалося отримати класифікації.');
    return response.json();
  }

  // ============= university ==============
  async fetchUGet(endpoint: string, params?: Record<string, any>) {
    const query = this.buildQueryString(this.clearParams(params));
    const url = `${API_URL_DOMAIN}${endpoint}?${query}`;
    console.log('Requesting:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) throw new Error('Не удалось get.');
    return response.json();
  }

  async fetchUPost(endpoint: string, params?: Record<string, any>) {
    const response = await fetch(API_URL_DOMAIN + endpoint, {
      method: 'POST',
      headers: {
        ...this.getAuthHeaders(),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.clearParams(params)),
    });

    if (!response.ok) throw new Error('Не удалось обновить избранное.');
    return response.json();
  }
}

// Использование
const api = new Api(
  baseApiUrlNews,
  '3pdsqqrmQF30uRogwtzgudG2RboTD9gYUJu0EOBWMDSM93KlYEWBxrCUSqHd34JL',
);
const apiUniverse = new Api(baseApiUrl);

export {api, apiUniverse};

// import {baseApiUrl, baseApiUrlNews} from './config';
// import axios, {AxiosInstance, AxiosResponse} from 'axios';
// import {API_URL_DOMAIN} from '@env';
// import {
//   INews,
//   IOneNews,
//   ICountries,
//   ITypes,
//   IClassification,
// } from 'src/screens/Opportunities/interface/opportunities.interface';
// import { Platform } from 'react-native';

// console.log(API_URL_DOMAIN);

// export class Api {
//   private host: string;
//   private axiosInstance: AxiosInstance;
//   // private clearParams: (params: Record<string, any>) => Record<string, any>;

//   constructor(host: string, token?: string) {
//     this.host = host;

//     this.axiosInstance = axios.create({
//       baseURL: this.host,
//       headers: {
//         Authorization: `Bearer ${token}`,
//         'Content-Type': 'application/json',
//         accept: 'application/json',
//       },
//     });
//     // console.log('Api initialized with host:', process.env);
//   }

//   clearParams = (params: Record<string, any> | undefined) => {
//     if (!params) return {};
//     const keys = Object.keys(params);
//     const paramsToDelete = ['filter'];
//     const paramsToDeleteKeys = keys.filter(
//       key => !paramsToDelete.includes(key),
//     );
//     paramsToDeleteKeys.forEach(key => {
//       if (
//         params[key] === undefined ||
//         params[key] === null ||
//         params[key] === ''
//       ) {
//         delete params[key];
//       } else if (Array.isArray(params[key])) {
//         if (params[key].length === 0) {
//           delete params[key];
//         } else {
//           params[key] = params[key].filter(
//             (item: any) => item !== undefined && item !== null && item !== '',
//           );
//         }
//       }
//     });
//     return params;
//   };
//   async sendNewUserNews(
//     endpoint: string,
//     params?: Record<string, any>,
//     headers?: Record<string, any>,
//   ): Promise<any> {
//     try {
//       const clearParam = this.clearParams(params);
//       console.log({params: clearParam});
//       const formData = new FormData();
//       for (let key of Object.keys(clearParam)) {
//         console.log('key ', [key]);
//         if (key === 'image') {
//           console.log('file', clearParam[key].uri);
//           const uri = clearParam[key].uri;
//           const name = uri.split('/').pop() ?? 'photo.jpg';
//           const extension = uri.split('.').pop()?.toLowerCase();
//           const type = extension ? `image/${extension}` : 'image/jpeg';
//           formData.append('files', {
//             uri: Platform.OS === 'ios' ? uri.replace('file://', '') : uri,
//             name: name,
//             type: type,
//           } as any); // иногда нужен as any для TS
//         } else {
//           formData.append(key, String(clearParam[key]));
//         }
//       }

//       const response: AxiosResponse = await this.axiosInstance.post(
//         this.host + endpoint,
//         formData,
//         {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//             accept: 'application/json',
//             ...headers,
//           },
//         },
//       );
//       console.log('Response data:', response);
//       return response.data;
//     } catch (error) {
//       console.error('Ошибка post request:', error);
//       // throw new Error('Не удалось обновить избранное.');
//     }
//   }
//   async fetchRegitUserNews(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<any> {
//     try {
//       const customParams = this.clearParams(params);
//       const response: AxiosResponse = await this.axiosInstance.post(
//         this.host + endpoint,
//         {...customParams},
//       );
//       return response;
//     } catch (error) {
//       if (
//         typeof error === 'object' &&
//         error !== null &&
//         'status' in error &&
//         (error as {status: number}).status === 409
//       ) {
//         console.log('Користувач вже зареєстрований у новинній базі.');
//         return;
//       }
//     }
//   }
//   async fetchGetCountries(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<ICountries> {
//     try {
//       const customParams = this.clearParams(params);
//       // console.log('full endpoint ', this.host + endpoint, customParams, this.axiosInstance.defaults.headers)
//       const response: AxiosResponse<ICountries> = await this.axiosInstance.get(
//         this.host + endpoint,
//         {
//           params: customParams,
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error('Помилка запиту отримання списка країн:', error);
//       throw new Error('Не вдалося отримати список країн.');
//     }
//   }
//   async fetchNews(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<INews> {
//     try {
//       const customParams = this.clearParams(params);
//       // console.log('full endpoint ', this.host + endpoint, customParams, this.axiosInstance.defaults.headers)
//       const response: AxiosResponse<INews> = await this.axiosInstance.get(
//         this.host + endpoint,
//         {
//           params: customParams,
//         },
//       );
//       return response.data;
//     } catch (error: any) {
//       console.error('Помилка запиту отримання новостей:', error);
//       throw new Error('Не вдалося отримати новости.');
//     }
//   }
//   async fetchBulkNews(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<INews> {
//     try {
//       const response: AxiosResponse<INews> = await this.axiosInstance.post(
//         this.host + endpoint,
//         params,
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Помилка запиту отримання новостей:', error);
//       throw new Error('Не вдалося отримати новость.');
//     }
//   }
//   async fetchOneNews(endpoint: string): Promise<IOneNews> {
//     try {
//       const response: AxiosResponse<IOneNews> = await this.axiosInstance.get(
//         this.host + endpoint,
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Помилка запиту отримання одну новину:', error);
//       throw new Error('Не вдалося отримати одну новину.');
//     }
//   }
//   async fetchTypesNews(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<ITypes> {
//     try {
//       const response: AxiosResponse<ITypes> = await this.axiosInstance.get(
//         this.host + endpoint,
//         {
//           params,
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Помилка запиту отримання типу новини:', error);
//       throw new Error('Не вдалося отримати типу новини.');
//     }
//   }
//   async fetchClassificationNews(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<IClassification> {
//     try {
//       const response: AxiosResponse<IClassification> =
//         await this.axiosInstance.get(this.host + endpoint, {
//           params,
//         });
//       return response.data;
//     } catch (error) {
//       console.error('Помилка запиту отримання класифікації:', error);
//       throw new Error('Не вдалося отримати класифікації.');
//     }
//   }

//   // ================================== university server
//   async fetchUGet(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<any> {
//     try {
//       const urlWithParams = this.axiosInstance.getUri({
//         url: API_URL_DOMAIN + endpoint,
//         params: this.clearParams(params),
//       });
//       console.log('Requesting:', urlWithParams);
//       const response: AxiosResponse = await this.axiosInstance.get(
//         API_URL_DOMAIN + endpoint,
//         {
//           params: {...this.clearParams(params)},
//         },
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Ошибка get request:', error);
//       throw new Error('Не удалось get.');
//     }
//   }

//   async fetchUPost(
//     endpoint: string,
//     params?: Record<string, any>,
//   ): Promise<any> {
//     try {
//       console.log({params: this.clearParams(params)});
//       const response: AxiosResponse = await this.axiosInstance.post(
//         API_URL_DOMAIN + endpoint,
//         {...this.clearParams(params)},
//       );
//       return response.data;
//     } catch (error) {
//       console.error('Ошибка post request:', error);
//       throw new Error('Не удалось обновить избранное.');
//     }
//   }
// }

// const api = new Api(
//   baseApiUrlNews,
//   '3pdsqqrmQF30uRogwtzgudG2RboTD9gYUJu0EOBWMDSM93KlYEWBxrCUSqHd34JL',
// );
// const apiUniverse = new Api(baseApiUrl);

// export {api, apiUniverse};
