import {baseApiUrl} from '@api/config';
import {UserInterface} from '@api/types/user.interface';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCurrentHeightSize, getCurrentWidthSize} from '@utils/currentSize';
import {icon} from 'src/assets/icons';
import axios from 'axios';
import React, {useCallback, useEffect, useState} from 'react';
import {MediaType, launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextCustom from 'src/ui/Text/TextCustom';

interface Props {
  navigation: Navigation;
}

const EditUserScreen: React.FC<Props> = props => {
  const [userData, setUserData] = useState<UserInterface | null>(null);
  const [authToken, setAuthToken] = useState('');
  const [editableName, setEditableName] = useState('');

  useEffect(() => {
    if (userData && userData.fullname) {
      setEditableName(userData.fullname);
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

  const handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo' as MediaType,
      quality: 0.7 as any,
    };

    launchImageLibrary(options, response => {
      if (response.assets && response.assets[0].uri) {
        const formData = new FormData();
        formData.append('file', {
          name: response.assets[0].fileName,
          type: response.assets[0].type,
          uri: response.assets[0].uri,
        });

        axios
          .post(`${baseApiUrl}/files/upload`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${authToken}`,
            },
          })
          .then(res => {
            getUserInfo();
            console.log(res.status);
            // setUserData();
          })
          .catch(error => {
            console.error('Error uploading image:', error);
          });
      }
    });
  };

  const handleChangeName = async () => {
    if (editableName === userData?.fullname) {
      props.navigation.goBack();
      return;
    }

    if (editableName.length < 3) {
      Alert.alert('Помилка', 'Будь ласка, введіть більше 3-х символів');
      return;
    }

    try {
      const response = await axios.put(
        `${baseApiUrl}/users/change-name`,
        {
          name: editableName,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      setUserData(response.data as UserInterface);

      props.navigation.goBack();
    } catch (error) {
      console.error('Error changing user name:', error);
    }
  };
  console.log(userData?.avatarUrl);
  return (
    <View style={styles.screen}>
      <View style={styles.content}>
        <View style={styles.topRectangle}></View>
        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            props.navigation.goBack();
          }}>
          <Image source={icon.backIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.editButton} onPress={handleChoosePhoto}>
          <Image source={icon.editProfileIcon} style={styles.editIcon} />
        </TouchableOpacity>
        <View style={styles.userInformation}>
          <Image
            source={{
              uri:
                `${baseApiUrl}/${userData?.avatarUrl}` ||
                'https://sites.cns.utexas.edu/sites/default/files/geometry_lab/files/default_person.jpg?m=1654796730',
            }}
            style={styles.image}
          />

          <View style={styles.name}>
            <TextCustom fontSize={18} fontWeight="600" lineHeight={19}>
              Імʼя
            </TextCustom>

            <TextInput
              style={styles.nameInput}
              onChangeText={setEditableName}
              value={editableName}
              placeholder={
                userData && userData.fullname ? userData.fullname : ''
              }
              placeholderTextColor={'black'}
              maxLength={20}
            />
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
        <TouchableOpacity style={styles.saveButton} onPress={handleChangeName}>
          <TextCustom fontSize={18} fontWeight="600" lineHeight={19}>
            Зберегти
          </TextCustom>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  name: {
    marginTop: 36,
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
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    minHeight: 50,
    marginTop: 16,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
  topRectangle: {
    backgroundColor: '#202026',
    width: '100%',
    height: getCurrentHeightSize(150, 225, 932),
    borderBottomLeftRadius: 64,
    borderWidth: 1,
    borderBottomColor: '#3D3B3E',
    borderLeftColor: '#3D3B3E',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingBottom: 36,
    paddingLeft: 32,
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
    bottom: 90,
  },

  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
  study: {
    width: '90%',
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

export default EditUserScreen;
