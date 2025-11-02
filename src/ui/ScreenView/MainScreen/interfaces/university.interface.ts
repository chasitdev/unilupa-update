import {CityType} from 'src/types/city.enum';
import {HostelInterface} from './hostel.interface';
import {SpecialityInterface} from './speciality.interface';

export interface UniversityInterface {
  id: string;
  shortName: string;
  fullName: string;
  adress: string;
  price: number;
  priceFrom: number;
  priceTo: number;
  previewImageUrl: string;
  imagesUrl: string[];
  rating: number;
  city: string;
  description: string;
  url: string;
  budgetSeatsCount?: number | null;
  seatsCount?: number | null;
  logo: string;
  isSaved: boolean;
  type: UniversityType;
  district: CityType;
  specialities: SpecialityInterface[];
  specialityCodes: string[];
  specialties: any;
  educationForms: string[];
  educationalLevel: string[];
  hostels?: HostelInterface[];
  longitude: number;
  latitude: number;
  comments: CommentInterface[];
}

export interface IRecommendationSlider {
  previewImageUrl: string;
  logo: string;
  fullName: string;
  shortName: string;
  city: string;
  adress: string;
}

export enum UniversityType {
  INSTITUTE = 'Інститут',
  COLLAGE = 'Коледж',
  UNIVERSITY = 'Університет',
  ACADEMY = 'Академія',
  UNDEFINED = 'Інше',
}

export interface CommentInterface {
  id: string;
  comment: string;
  likes: number;
  dislikes: number;
  rate: number;
  fullname: string;
  imageUrl: any;
  createdAt: string;
  likedBy: string[];
  dislikedBy: string[];
  parentComment: CommentInterface | null;
}
