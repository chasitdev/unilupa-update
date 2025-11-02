import {UniversityInterface} from '../ui/MainScreen/interfaces/university.interface';
import {createContext} from 'react';

type UniversityContextType = {
  universities: UniversityInterface[];
  savedUniversities: UniversityInterface[];
  setSavedUniversities: (saved: UniversityInterface[]) => void;
  addComparison: (university: UniversityInterface) => void;
  removeComparison: (university: UniversityInterface) => void;
  comparisonUniversities: UniversityInterface[];
  clearComparison: () => void;
  fetchData: () => void;
};

export const UniversityContext = createContext<UniversityContextType | null>(
  null,
);
