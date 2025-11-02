export enum LanguageEnum {
  UA = 'ua',
  EN = 'en',
}
export interface IUser {
  avatarUrl: string | null;
  createdAt: Date;
  email: string;
  fullname: string;
  id: string;
  isPremium: boolean;
  language: LanguageEnum;
  password: string | null;
  phone: string | null;
  updatedAt: Date;
}
