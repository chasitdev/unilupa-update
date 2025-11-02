import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import CollapsibleSection from './CollapsibleCollection';
import EducationButton from './EducationButton';
import EducationOptionButton from './EducationOptionButton';
import HeaderEducation from './HeaderEducation';
import SkipButtonEducation from './SkipButtonEducation';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import {specialities} from 'src/types/specialties';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {countMatches} from '@utils/countMatches';
import axios from 'axios';
import React, {useState} from 'react';
import {Alert, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

interface Props {
  navigation: Navigation;
}

const ChooseEducationScreen: React.FC<Props> = props => {
  const auth = useAuth();
  const [selectedSpecialities, setSelectedSpecialities] = useState<string[]>(
    auth.user?.specialities || [],
  );

  const sendSpeciality = async () => {
    try {
      const authToken = await AsyncStorage.getItem(StorageEnum.accessToken);

      const response = await axios.post(
        `${baseApiUrl}/users/speciality`,
        {
          specialities: selectedSpecialities,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      if (response.status === 200 || response.status === 201) {
        props.navigation.navigate({
          name: StackScreenBottomMenu.AUTHORIZATION,
          params: {
            screen: AuthorizationScreen.LOCATION,
          },
        });
      } else {
        throw new Error('Failed to update speciality');
      }
    } catch (error) {
      console.error('Error updating speciality:', error);
      Alert.alert('Error', 'Failed to update speciality');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderEducation />
      <ScrollView style={styles.scrollView}>
        {specialities.map(section => {
          const count = countMatches(
            section.specialties.map(s => s.code),
            selectedSpecialities,
          );

          return (
            <CollapsibleSection
              key={section.code}
              title={`${section.name} ${count > 0 ? `(${count})` : ''}`}>
              {section.specialties.map(s => (
                <EducationOptionButton
                  key={s.code}
                  title={s.name}
                  onPress={() => {
                    if (selectedSpecialities.includes(s.code)) {
                      setSelectedSpecialities(
                        selectedSpecialities.filter(spec => spec != s.code),
                      );
                      return;
                    }

                    setSelectedSpecialities([...selectedSpecialities, s.code]);
                  }}
                  isSelected={selectedSpecialities.includes(s.code)}
                />
              ))}
            </CollapsibleSection>
          );
        })}
      </ScrollView>
      <View style={styles.bottomButtons}>
        <EducationButton onPress={sendSpeciality} />

        <SkipButtonEducation
          onPress={() => {
            auth.authorization();
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: '100%',
    padding: 16,
  },
  buttons: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
  },
  bottomButtons: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
});

export default ChooseEducationScreen;
