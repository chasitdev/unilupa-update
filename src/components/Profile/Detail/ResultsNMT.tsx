import {baseApiUrl} from '@api/config';
import {UserInterface} from '@api/types/user.interface';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentWidthSize} from '@utils/currentSize';
import {icon} from 'src/assets/icons';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {PickerItem} from 'src/types/filter.type';
import TextCustom from 'src/ui/Text/TextCustom';
import StyledPickerV2 from 'src/components/Picker/StyledPickerV2';

interface Props {
  navigation: Navigation;
}

const foreignLanguageItems: PickerItem[] = [
  {
    label: 'Обрати',
    value: undefined,
  },
  {
    label: 'Англійська мова',
    value: 'Англійська мова',
  },
  {
    label: 'Іспанська мова',
    value: 'Іспанська мова',
  },
  {
    label: 'Німецька мова',
    value: 'Німецька мова',
  },
  {
    label: 'Французька мова',
    value: 'Французька мова',
  },
  {
    label: 'Українська література',
    value: 'Українська література',
  },
  {
    label: 'Біологія',
    value: 'Біологія',
  },
  {
    label: 'Географія',
    value: 'Географія',
  },
  {
    label: 'Фізика',
    value: 'Фізика',
  },
  {
    label: 'Хімія',
    value: 'Хімія',
  },
];

const years: PickerItem[] = [
  {
    label: 'Не складав',
    value: undefined,
  },
  {
    label: '2014',
    value: '2014',
  },
  {
    label: '2015',
    value: '2015',
  },
  {
    label: '2016',
    value: '2016',
  },
  {
    label: '2017',
    value: '2017',
  },
  {
    label: '2018',
    value: '2018',
  },
  {
    label: '2019',
    value: '2019',
  },
  {
    label: '2020',
    value: '2020',
  },
  {
    label: '2021',
    value: '2021',
  },
  {
    label: '2022',
    value: '2022',
  },
  {
    label: '2023',
    value: '2023',
  },
  {
    label: '2024',
    value: '2024',
  },
  {
    label: '2025',
    value: '2025',
  },
  {
    label: '2026',
    value: '2026',
  },
  {
    label: '2027',
    value: '2027',
  },
  {
    label: '2028',
    value: '2028',
  },
  {
    label: '2029',
    value: '2029',
  },
  {
    label: '2030',
    value: '2030',
  },
];

const ResultsNMTScreen: React.FC<Props> = props => {
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [authToken, setAuthToken] = useState('');

  const [passYear, setPassYear] = useState('');
  const [ukrainianResultsNMT, setUkrainianResultsNMT] = useState('');
  const [mathResultsNMT, setMathResultsNMT] = useState('');
  const [historyResultsNMT, setHistoryResultsNMT] = useState('');
  const [foreignLanguageResultsNMT, setForeignLanguageResultsNMT] =
    useState('');
  const [foreignLanguageSubgect, setForeignLanguageSubgect] = useState('');

  useEffect(() => {
    if (userData) {
      setForeignLanguageResultsNMT(
        userData?.foreignLanguageResultsNMT
          ? userData?.foreignLanguageResultsNMT.toString()
          : '',
      );
      setForeignLanguageSubgect(
        userData?.foreignLanguageSubgect
          ? userData?.foreignLanguageSubgect
          : '',
      );
      setPassYear(userData?.passYear ? userData?.passYear : '');
      setUkrainianResultsNMT(
        userData?.ukrainianResultsNMT
          ? userData?.ukrainianResultsNMT.toString()
          : '',
      );
      setMathResultsNMT(
        userData?.mathResultsNMT ? userData?.mathResultsNMT.toString() : '',
      );
      setHistoryResultsNMT(
        userData?.historyResultsNMT
          ? userData?.historyResultsNMT.toString()
          : '',
      );
    }
  }, [userData]);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await AsyncStorage.getItem(StorageEnum.accessToken);
      if (typeof accessToken === 'string') {
        setAuthToken(accessToken);
      }
    };
    fetchToken();
  }, []);

  const getUserInfo = useCallback(async () => {
    if (!authToken) return;
    try {
      const response = await axios.get(`${baseApiUrl}/users/me`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      setUserData(response.data.user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [authToken]);

  useFocusEffect(
    useCallback(() => {
      getUserInfo();
    }, [getUserInfo]),
  );

  const handleChangeUkrainianResultsNMT = (text: string) => {
    if (isValidPoints(text)) {
      setUkrainianResultsNMT(text);
    }
  };

  const handleChangeMathResultsNMT = (text: string) => {
    if (isValidPoints(text)) {
      setMathResultsNMT(text);
    }
  };

  const handleChangeHistoryResultsNMT = (text: string) => {
    if (isValidPoints(text)) {
      setHistoryResultsNMT(text);
    }
  };

  const handleChangeForeignLanguageResultsNMT = (text: string) => {
    if (isValidPoints(text)) {
      setForeignLanguageResultsNMT(text);
    }
  };

  const isValidPoints = (text: string) => {
    if (text.length === 0) {
      return true;
    }

    if (text.match(/^[0-9]{1,3}$/)) {
      if (parseInt(text) > 200) {
        return false;
      }

      return true;
    }

    return false;
  };

  const handleSave = async () => {
    if (!authToken) return;
    try {
      const response = await axios.put(
        `${baseApiUrl}/users`,
        {
          ukrainianResultsNMT: ukrainianResultsNMT || null,
          mathResultsNMT: mathResultsNMT || null,
          historyResultsNMT: historyResultsNMT || null,
          foreignLanguageResultsNMT: foreignLanguageResultsNMT || null,
          foreignLanguageSubgect: foreignLanguageSubgect || null,
          passYear: passYear || null,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );

      setUserData(response.data.user);

      props.navigation.goBack();
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={icon.backIcon} style={styles.icon} />
        </TouchableOpacity>

        <View style={styles.userInformation}>
          <TextCustom
            textAlign="left"
            fontSize={20}
            fontWeight="400"
            lineHeight={19}>
            Результати ЗНО/НМТ
          </TextCustom>

          <View style={styles.name}>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              <StyledPickerV2
                onChange={(v: string) => {
                  setPassYear(v);
                }}
                value={passYear}
                items={years}
                zIndex={0}
              />

              <TextCustom
                fontSize={14}
                fontWeight="300"
                lineHeight={19}
                style={styles.label}>
                Рік складання ЗНО/НМТ
              </TextCustom>
            </View>
          </View>

          <View style={styles.name}>
            <TextInput
              style={styles.nameInput}
              onChangeText={handleChangeUkrainianResultsNMT}
              value={ukrainianResultsNMT}
              placeholder={
                userData && userData.ukrainianResultsNMT
                  ? userData.ukrainianResultsNMT.toString()
                  : ''
              }
              placeholderTextColor={'black'}
              maxLength={20}
            />

            <TextCustom
              fontSize={14}
              fontWeight="300"
              lineHeight={19}
              style={styles.label}>
              Українська мова
            </TextCustom>
          </View>

          <View style={styles.name}>
            <TextInput
              style={styles.nameInput}
              onChangeText={handleChangeMathResultsNMT}
              value={mathResultsNMT}
              placeholder={
                userData && userData.mathResultsNMT
                  ? userData.mathResultsNMT.toString()
                  : ''
              }
              placeholderTextColor={'black'}
              maxLength={20}
            />

            <TextCustom
              fontSize={14}
              fontWeight="300"
              lineHeight={19}
              style={styles.label}>
              Математика
            </TextCustom>
          </View>

          <View style={styles.name}>
            <TextInput
              style={styles.nameInput}
              onChangeText={handleChangeHistoryResultsNMT}
              value={historyResultsNMT}
              placeholder={
                userData && userData.historyResultsNMT
                  ? userData.historyResultsNMT.toString()
                  : ''
              }
              placeholderTextColor={'black'}
              maxLength={20}
            />

            <TextCustom
              fontSize={14}
              fontWeight="300"
              lineHeight={19}
              style={styles.label}>
              Історія
            </TextCustom>
          </View>

          <View style={styles.name}>
            <View
              style={{
                paddingHorizontal: 16,
              }}>
              <StyledPickerV2
                onChange={(v: string) => {
                  setForeignLanguageSubgect(v);
                }}
                value={foreignLanguageSubgect}
                items={foreignLanguageItems}
                zIndex={0}
              />

              <TextCustom
                fontSize={14}
                fontWeight="300"
                lineHeight={19}
                style={styles.label}>
                4 предмет
              </TextCustom>
            </View>
          </View>

          <View style={styles.name}>
            <TextInput
              style={styles.nameInput}
              onChangeText={handleChangeForeignLanguageResultsNMT}
              value={foreignLanguageResultsNMT}
              placeholder={
                userData && userData.foreignLanguageResultsNMT
                  ? userData.foreignLanguageResultsNMT.toString()
                  : ''
              }
              placeholderTextColor={'black'}
              maxLength={20}
            />

            <TextCustom
              fontSize={14}
              fontWeight="300"
              lineHeight={19}
              style={styles.label}>
              Іноземна мова
            </TextCustom>
          </View>

          <View style={styles.textRow}></View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: 'black',
        }}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <TextCustom fontSize={18} fontWeight="600" lineHeight={19}>
            Зберегти
          </TextCustom>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  label: {
    position: 'absolute',
    bottom: 40,
    marginLeft: 12,
    backgroundColor: 'black',
    paddingHorizontal: 6,
    color: '#FFFFFFAA',
  },
  name: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#0E46F1',
    width: '90%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 10,
  },
  nameInput: {
    width: getCurrentWidthSize(366, 430),
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
  },
  textRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: 10,
    paddingRight: 10,
  },
  inlineEditButton: {
    backgroundColor: '#0E46F1',
    width: 48,
    height: 48,
    borderRadius: 3,
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  screen: {
    backgroundColor: 'black',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  nameText: {
    marginTop: 5,
  },
  text: {
    marginTop: 15,
  },
  image: {
    width: 160,
    height: 160,
    borderRadius: 16,
    backgroundColor: '#454545',
  },
  icon: {
    width: 24,
    height: 24,
  },
  editIcon: {
    width: 12,
    height: 12,
  },
  button: {
    marginTop: 50,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  userInformation: {
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 120,
    gap: 16,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
  study: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  studyText: {
    marginBottom: 10,
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    left: 25,
    width: 48,
    height: 48,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  editButton: {
    position: 'absolute',
    marginTop: 235,
    right: 100,
    width: 24,
    height: 24,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    zIndex: 1000,
  },
});

export default ResultsNMTScreen;
