import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import {specialities} from 'src/types/specialties';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp} from '@react-navigation/native';
import {countMatches} from '@utils/countMatches';
import {icon} from 'src/assets/icons';
import axios from 'axios';
import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import HeaderEducation from 'src/components/Education Screen/HeaderEducation';
import CollapsibleSection from 'src/components/Education Screen/CollapsibleCollection';
import EducationOptionButton from 'src/components/Education Screen/EducationOptionButton';
import SaveButton from 'src/ui/ScreenView/Location Settings Screen/SaveButton';

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {test: string}>, 'key'>;
}

const ChooseEducationScreenSettings: React.FC<Props> = props => {
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
        props.navigation.goBack();
        // props.navigation.navigate({
        //   name: Stack.AUTHORIZATION,
        //   params: {
        //     screen: AuthorizationScreen.LOCATION,
        //     params: {
        //       access_token: authToken,
        //     },
        //   },
        // });
      } else {
        throw new Error('Failed to update speciality');
      }
    } catch (error) {
      console.error('Error updating speciality:', error);
      Alert.alert('Error', 'Failed to update speciality');
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.settingsButton}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <Image source={icon.backIcon} style={styles.icon} />
          </TouchableOpacity>

          <HeaderEducation />
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={{paddingBottom: 30}}>
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
                      title={`${s.name} (${s.code})`}
                      onPress={() => {
                        if (selectedSpecialities.includes(s.code)) {
                          setSelectedSpecialities(
                            selectedSpecialities.filter(spec => spec != s.code),
                          );
                          return;
                        }

                        setSelectedSpecialities([
                          ...selectedSpecialities,
                          s.code,
                        ]);
                      }}
                      isSelected={selectedSpecialities.includes(s.code)}
                    />
                  ))}
                </CollapsibleSection>
              );
            })}
          </ScrollView>
          <View style={styles.bottomButtons}>
            <SaveButton
              onPress={() => {
                sendSpeciality();
                auth.setSpecialities(selectedSpecialities);
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
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
  settingsButton: {
    alignSelf: 'flex-start',
    width: 48,
    height: 48,
    marginLeft: 16,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default ChooseEducationScreenSettings;
