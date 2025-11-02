import {UserInterface} from 'src/api/types/user.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ReactNode, useCallback, useEffect, useState} from 'react';
import {AuthContext} from './auth.types';

import {getMe} from 'src/api/types/getMe';
import React from 'react';
import {StorageEnum} from '../../navigation/types/storage.type';
import {CityType} from 'src/types/city.enum';
import SplashScreen from 'src/components/Auth/Onboarding/SplashScreen';

export type Props = {
  children: ReactNode;
};

const AuthProvider: React.FC<Props> = props => {
  const [user, setUser] = useState<UserInterface | null>(null);
  const [check, setCheck] = useState(false);

  const authorization = useCallback(async () => {
    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);
    // console.log('authAuth', accessToken);
    if (!accessToken) {
      setCheck(true);
      return;
    }
    login(accessToken);
  }, []);

  const login = async (accessToken: string) => {
    AsyncStorage.setItem(StorageEnum.accessToken, accessToken);

    const user = await getMe();
    console.log(user);

    if (user.data) {
      setUser(user.data);
    }

    setCheck(true);
  };

  const setSpecialities = async (specialities: string[]) => {
    if (!user) {
      return;
    }

    setUser({
      ...user,
      specialities,
    });
  };

  const setInstitution = async (institution: string | null) => {
    if (!user) {
      return;
    }

    setUser({
      ...user,
      educationInstitution: institution,
    });
  };

  const setCities = async (cities: CityType[]) => {
    if (!user) {
      return;
    }

    setUser({
      ...user,
      city: cities,
    });
  };

  const logout = () => {
    setUser(null);
    AsyncStorage.removeItem(StorageEnum.accessToken);
  };
  useEffect(() => {
    authorization();
  }, [authorization]);

  if (!check) {
    return <SplashScreen />;
  }
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        authorization,
        setSpecialities,
        setCities,
        setInstitution,
      }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export {AuthContext, AuthProvider};
