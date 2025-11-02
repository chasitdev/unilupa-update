import {useContext} from 'react';
import {UniversityContext} from './university.type';

const useUniversityContext = () => {
  const context = useContext(UniversityContext);
  if (context === null) {
    throw new Error(
      'useUniversityContext must be used within an UniversityProvider',
    );
  }
  return context;
};

export default useUniversityContext;
