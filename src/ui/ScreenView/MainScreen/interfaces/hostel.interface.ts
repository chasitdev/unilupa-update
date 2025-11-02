import {UniversityInterface} from './university.interface';

export interface HostelInterface {
  id?: string;
  name?: string;
  photoUrls: string[];
  adress: string;
  cost: number;
  university: UniversityInterface;
  longitude: number;
  latitude: number;
}
