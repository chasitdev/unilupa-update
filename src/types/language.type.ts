export interface ILanguage {
  title: string;
  code: Language;
}

export enum Language {
  English = 'en',
  Ukrainian = 'ua',
}

export interface ILanguageAPI {
  [key: Language]: string;
}
