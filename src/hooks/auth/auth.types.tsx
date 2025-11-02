import {CityType} from 'src/types/city.enum';
import {createContext} from 'react';
import {UserInterface} from 'src/api/types/user.interface';

type AuthContextType = {
  user: UserInterface | null;
  login: (accessToken: string) => void;
  logout: () => void;
  authorization: () => void;
  setSpecialities: (specialities: string[]) => void;
  setCities: (cities: CityType[]) => void;
  setInstitution: (institution: string | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
