import {StorageEnum} from 'src/navigation/types/storage.type';
import {UniversityInterface} from '../../ui/ScreenView/MainScreen/interfaces/university.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {ReactNode, useEffect, useState} from 'react';
import {View} from 'react-native';
import {UniversityContext} from './university.type';
import SplashScreen from 'src/components/Auth/Onboarding/SplashScreen';
import {baseApiUrl} from 'src/api/config';

export type Props = {
  children: ReactNode;
};

const UniversityProvider: React.FC<Props> = props => {
  const [universities, setUniversities] = useState<UniversityInterface[]>([]);
  const [savedUniversities, setSavedUniversities] = useState<
    UniversityInterface[]
  >([]);
  const [comparisonUniversities, setComparisonUniversities] = useState<
    UniversityInterface[]
  >([]);

  const [check, setCheck] = useState(false);

  useEffect(() => {
    fetchData();
    fetchSavedData();
  }, []);

  useEffect(() => {
    const fetch = async () => {
      const comparison = await AsyncStorage.getItem(
        StorageEnum.comparisonUniversities,
      );

      if (comparison) {
        setComparisonUniversities(JSON.parse(comparison));
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(
      StorageEnum.comparisonUniversities,
      JSON.stringify(comparisonUniversities),
    );
  }, [comparisonUniversities]);

  async function addComparison(university: UniversityInterface) {
    if (comparisonUniversities.includes(university)) {
      return;
    }

    setComparisonUniversities([...comparisonUniversities, university]);
  }

  async function removeComparison(university: UniversityInterface) {
    setComparisonUniversities(
      comparisonUniversities.filter(u => u.id !== university.id),
    );
  }

  async function clearComparison() {
    setComparisonUniversities([]);
  }

  async function loadSaved(unvers: UniversityInterface[]) {
    setSavedUniversities(unvers);
  }

  async function fetchData() {
    setCheck(false);

    let url = `${baseApiUrl}/university/search/?page=1&pageSize=2000`;
    const response = await axios.get(url, {});
    setUniversities(response.data.filter((u: any) => u.shortName));

    // await new Promise(resolve => setTimeout(resolve, 1500));
    setCheck(true);
  }

  async function fetchSavedData() {
    setCheck(false);

    const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);

    if (!accessToken) {
      setCheck(true);
      return;
    }

    let url = `${baseApiUrl}/users/all-saved-universities?page=1&pageSize=1000`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // console.log('responseeee', response.data.universities);

    setSavedUniversities(response.data.universities);

    // await new Promise(resolve => setTimeout(resolve, 1500));
    setCheck(true);
  }

  if (!check) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'black',
        }}>
        <SplashScreen />
      </View>
    );
  }

  return (
    <UniversityContext.Provider
      value={{
        universities,
        savedUniversities,
        setSavedUniversities: loadSaved,
        addComparison,
        removeComparison,
        comparisonUniversities,
        clearComparison,
        fetchData,
      }}>
      {props.children}
    </UniversityContext.Provider>
  );
};

export {UniversityContext, UniversityProvider};
