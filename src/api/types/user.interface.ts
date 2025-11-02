import {specialities} from 'src/types/specialties';
import {CityType} from 'src/types/city.enum';

export interface UserInterface {
  id: string;
  fullname: string;
  avatarUrl: string;
  email: string;
  phone: string;
  language: string;

  isEmailNotification: boolean;

  password: string;
  yearEntering?: number | null;
  educationInstitution?: string | null;
  speciality?: string;
  city?: CityType[];
  specialities: string[];

  passYear?: string | null;

  ukrainianResultsNMT: number;
  mathResultsNMT: number;
  historyResultsNMT: number;
  foreignLanguageResultsNMT: number;
  foreignLanguageSubgect: string;
  data: {
    id: number
  }
}
