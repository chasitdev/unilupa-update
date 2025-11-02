import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useContext, useEffect, useState} from 'react';

interface IProps {
  children: React.ReactNode;
}

interface ILanguageContextType {
  language: string;
  updateLanguage: (v: string) => Promise<void>;
}
const LanguageContext = createContext<ILanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider: React.FC<IProps> = ({children}) => {
  const [language, setLanguage] = useState<string>('en');

  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const storedLanguage = await AsyncStorage.getItem('language');
        if (storedLanguage) {
          setLanguage(storedLanguage);
        }
      } catch (e) {
        console.error('Failed to load language from storage', e);
      }
    };

    loadLanguage();
  }, []);

  const updateLanguage = async (newLanguage: string) => {
    try {
      setLanguage(newLanguage);
      await AsyncStorage.setItem('language', newLanguage);
    } catch (e) {
      console.error('Failed to save language to storage', e);
    }
  };

  return (
    <LanguageContext.Provider value={{language, updateLanguage}}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('Language context working in Language Provider');
  }
  return context;
};
