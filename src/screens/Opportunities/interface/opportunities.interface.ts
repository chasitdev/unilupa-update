export interface IParticipants {
  age: string;
  description: string;
  sex: string;
  min_age: number;
  max_age: number;
}

interface ILocation {
  country: string;
  region: string;
  address: string;
}

export interface IDataOneNews {
  title: string;
  participants: IParticipants;
  date_range: {
    date_from: string; // ISO format: e.g. "2025-10-11T10:39:04.438Z"
    date_to: string;
  };
  place_data: ILocation;
  online: boolean | null;
  funding: string | null;
  deadline_date: string | null; // ISO date string
  description: string;
  type: 'content'; // если других вариантов нет
  opportunity_type: string; // e.g. "тренінги", "гранти", "проєкти"
  links: string[]; // массив ссылок
  organization_title: string | null;
  condition: string | null;
  classification: string[];
  media: MediaItem[];
}

interface MediaItem {
  id: string;
  filename: string | null;
  url: string;
  type: string;
  default: boolean;
}

export interface IOneNews {
  id: string;
  received_at: string;
  processed_data: IDataOneNews;
}
export interface INews {
  data: IOneNews[];
  meta: IMetaPagination;
}

export interface IMetaPagination {
  page: number;
  total: number;
  total_pages: number;
}

export interface ITypes {
  meta: IMetaPagination;
  data: ITypesNews[];
  errors: IError[];
}

export interface ITypesNews {
  _id: string;
  name: string;
  is_active: boolean;
}

export interface IClassification {
  meta: IMetaPagination;
  data: IClassificationNews[];
  errors: IError[];
}
export interface IClassificationNews {
  _id: string;
  name: string;
  is_active: boolean;
  group: {
    name: string;
    key: string;
  };
}

export interface IName {
  UA: string;
  EN: string;
}

export interface IDataCountries {
  id: string;
  name: IName;
  country_code: string;
}

export interface ICountries {
  meta: IMetaPagination;
  data: IDataCountries[];
  errors: IError[];
}

export interface IError {
  detail: {
    loc: string[];
    msg: string;
    type: string;
  };
}
export interface ICity {
  id: string;
  name: IName;
}
export interface IRegion {
  id: string;
  name: IName;
}
export interface ICities {
  meta: IMetaPagination;
  data: ICity[];
  errors: IError[];
}
