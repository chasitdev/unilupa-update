import React, {useRef, useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {TopBarRef} from '../../ui/DetailHeaderActions/DetailHeaderActions';
import {styles} from './styles/opportunities-main-styles';
import {StackScreenBottomMenu} from 'src/types/screens.type';
import HeaderActions from '../../ui/DetailHeaderActions/HeaderActions';
import Offset from '../../ui/Offset/Offset';
import {TouchableOpacity} from 'react-native';
import {icon} from 'src/assets/icons';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../ui/Buttons/Button';
import FormInputCelender from '@components/FormInputCelender/FormInputCelender';
import {api} from 'src/api/api';
import TextTitle from 'src/ui/Text/TextTitle';
import FormInput from 'src/ui/Text/FormInput';
import LocationCreateNews from 'src/components/locations/LocationCreateNews/LocationCreateNews';
import {BlurView} from '@react-native-community/blur';
import useAuth from 'src/hooks/auth/useAuth';
import Error from 'src/ui/Errors/Error';
import {color} from 'src/utils/colors';
import {useNavigation} from '@react-navigation/native';
import {Navigation} from 'src/navigation/types/navigation.type';

export interface ICustomOpportunities {
  // navigation: Navigation;
}

interface EventDataNewNewsError {
  files: string;
  min_age: string;
  max_age: string;
  sex: string;
  address_id: string;
  online: string;
  date_from: string;
  date_to: string;
  description: string;
  link: string;
  title: string;
  organization_title: string;
  condition: string;
  email: string;
  phone_number: string;
}

interface EventDataNewNews {
  files: {uri: string} | {}; // Список файлов (или их идентификаторов)
  min_age: number; // Минимальный возраст
  max_age: number; // Максимальный возраст
  sex: string; // Пол участника
  address_id: string | null; // ID адреса, может быть null
  online: boolean; // Является ли событие онлайн
  date_from: string | null; // Дата начала события (формат: YYYY-MM-DD)
  date_to: string | null; // Дата окончания события (формат: YYYY-MM-DD)
  description: string; // Описание события
  link: string; // Ссылка на событие
  title: string; // Название события
  organization_title: string; // Название организации
  condition: string; // Условия участия
  email: string | null; // Email пользователя
  phone_number: string | null; // Телефон пользователя
}

const initInputForm = {
  files: {}, // {uri: ''},
  min_age: 0,
  max_age: 100,
  sex: '',
  address_id: '68e4a97e3f4fd438c1e87919',
  online: false,
  date_from: '',
  date_to: '',
  description: '',
  link: '',
  title: '',
  organization_title: '',
  condition: '',
  email: '',
  phone_number: '',
};

const initError = {
  files: '', // {uri: ''},
  min_age: '',
  max_age: '',
  sex: '',
  address_id: '',
  online: '',
  date_from: '',
  date_to: '',
  description: '',
  link: '',
  title: '',
  organization_title: '',
  condition: '',
  email: '',
  phone_number: '',
};
const CustomOpportunities: React.FC<ICustomOpportunities> = () => {
  const navigation = useNavigation<Navigation>();
  const topBarRef = useRef<TopBarRef>(null);
  const [isOpenDropdown, setIsOpenDropdown] = useState(false);
  const [imageUri, setImageUri] = useState<any>(icon.addImage);
  const [isLoading, setLoading] = useState(false);
  const user = useAuth();
  const [stateOpportunities, setStateOpportunities] =
    useState<EventDataNewNews>(initInputForm);
  const [errorMessage, setErrorMessage] =
    useState<EventDataNewNewsError>(initError);

  const handleScroll = (event: any) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    const newOpacity = Math.max(0.35, 1 - scrollY / 700);
    topBarRef.current?.setOpacity(newOpacity);
  };

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const uri: string = response.assets[0].uri ?? '';

          setImageUri({uri});
          setStateOpportunities(state => ({
            ...state,
            files: {uri},
          }));
        } else {
          console.warn('No assets returned from image picker');
        }
      },
    );
  };

  const handleSetError = function (key: string, value: string) {
    setTimeout(() => {
      setErrorMessage(initError);
    }, 5000);
    setErrorMessage(state => ({
      ...state,
      [key]: value,
    }));
  };

  const handleDone = async function () {
    try {
      setLoading(true);
      const url = '/api/v2/news/user-post';
      const params = {
        ...stateOpportunities,
      };
      const response = await api.sendNewUserNews(url, params, {
        'X-User-Auth': user.user.id,
      });
      console.log({response});
      // console.error('Response error:', JSON.stringify(response, null, 2));
      if (response?.error) {
        let arrError = [];
        if (Array.isArray(response.error)) {
          arrError = response.error;
          for (let err of arrError) {
            const er = err.detail;
            console.error('detail error:', er);
            handleSetError(er.loc[er.loc.length - 1], er.msg);
          }
        } else if (Array.isArray(response.error.detail)) {
          arrError = response.error.detail;
          for (let err of arrError) {
            // console.error('detail error:', err);
            handleSetError(err.loc[err.loc.length - 1], err.msg);
          }
        }
      }
      if (response.status === 'pending') {
        Alert.alert(
          'Створено успішно',
          'Вашу можливість було додано на розгляд модератора',
          [
            {
              text: 'Добре',
              onPress: () =>
                navigation.navigate({
                  name: StackScreenBottomMenu.OpportunitiesMain,
                  params: {
                    screen: StackScreenBottomMenu.OpportunitiesMenu,
                  },
                }),
            },
          ],
          {cancelable: false},
        );
      }
      setLoading(false);
    } catch (error) {
      console.log('Catch error', error);
      setLoading(false);
    }
    // Alert.alert('info ', JSON.stringify(stateOpportunities))
  };

  const handleInputChange = (keyObj: string, text: string) => {
    console.log({keyObj});
    setStateOpportunities(state => ({
      ...state,
      [keyObj]: text,
    }));
  };

  // console.log({stateOpportunities});
  return (
    <View style={styles.container}>
      <SafeAreaView>
        <HeaderActions
          ref={topBarRef}
          pathCameBack={StackScreenBottomMenu.OpportunitiesMain}
        />
        {/* <Offset mb={ 20 } /> */}
        <ScrollView
          showsVerticalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}>
          <TouchableOpacity
            onPress={selectImage}
            style={{
              borderColor: errorMessage.files ? color.error : 'transparent',
              borderWidth: 1,
            }}>
            <Image source={imageUri} style={styles.imagePreview} />
            {errorMessage.files ? (
              <Error
                errorMessage={errorMessage.files}
                style={{
                  bottom: 3,
                  left: 5,
                }}
              />
            ) : null}
          </TouchableOpacity>
          <FormInput
            value={stateOpportunities.title}
            placeholder={'Введіть назву проєкту...'}
            setValue={(value: string) => handleInputChange('title', value)}
            maxLength={1000}
            style={styles.inputTitleWrap}
            errorMessage={errorMessage.title}
            showError={errorMessage.title ? true : false}
            styleInput={{color: '#91939F', ...styles.inputTitle}}
          />
          <Offset mb={30} />
          {/* Місце проведення */}
          <BlurView
            blurType={undefined}
            blurAmount={10} // значение от 0 до 100
            reducedTransparencyFallbackColor="white"
            style={[
              StyleSheet.absoluteFill,
              {
                zIndex: isOpenDropdown ? 1000 : -1,
              },
            ]}
          />
          <TextTitle title="Загальна інформація" location="left" />
          <Offset mt={10} />
          <LocationCreateNews
            iconLeftText={icon.calender}
            title={'Місце проведення:'}
            onChange={(id: string) => handleInputChange('address_id', id)}
            setIsOpenDropdown={setIsOpenDropdown}
            errors={errorMessage}
          />
          {/* <Offset mb={10} /> */}
          {/* Дати */}
          <>
            <FormInputCelender
              title={'Дата проведення *'}
              onChangeData={setStateOpportunities}
              data={stateOpportunities}
              keyObj={'date_from'}
              placeholder="dd/mm/yyyy"
              style={{
                zIndex: 999,
              }}
              styleInput={{height: 35}}
              iconLeftText={icon.calender}
              errorMessage={errorMessage.date_from}
            />

            <Offset mt={15} />
            <FormInputCelender
              title={'Зареєструватися до:'}
              onChangeData={setStateOpportunities}
              data={stateOpportunities}
              keyObj={'date_to'}
              placeholder="dd/mm/yyyy"
              iconLeftText={icon.fire}
              style={{
                zIndex: 998,
              }}
              styleInput={{height: 35}}
              errorMessage={errorMessage.date_to}
            />
          </>
          <Offset mb={20} />
          {/* Організатор */}
          <FormInput
            title="Організатор"
            value={stateOpportunities.organization_title}
            placeholder="Назва організації або фонду"
            setValue={text => handleInputChange('organization_title', text)}
            iconLeftText={icon.profileBar}
            style={{
              backgroundColor: 'trsndparent',
              borderWidth: 1,
              borderColor: '#5E5F6B',
              minHeight: 37,
              height: 37,
            }}
            errorMessage={errorMessage.organization_title}
            showError={errorMessage.organization_title ? true : false}
            styleInput={{color: '#91939F'}}
          />
          <Offset mb={20} />
          {/* Опис */}
          <FormInput
            title="Опис"
            value={stateOpportunities.description}
            placeholder="Детально опишіть вашу можливість"
            setValue={text => handleInputChange('description', text)}
            maxLength={500}
            multiline
            style={{
              backgroundColor: 'trsndparent',
              borderWidth: 1,
              borderColor: '#5E5F6B',
              minHeight: 137,
              height: 137,
            }}
            errorMessage={errorMessage.description}
            showError={errorMessage.description ? true : false}
            styleInput={{color: '#91939F'}}
          />
          <Offset mb={20} />
          {/* Вимоги */}
          <FormInput
            title="Вимоги"
            value={stateOpportunities.condition}
            placeholder="Детально опишіть вашу можливість"
            setValue={text => handleInputChange('condition', text)}
            maxLength={500}
            multiline
            style={{
              backgroundColor: 'trsndparent',
              borderWidth: 1,
              borderColor: '#5E5F6B',
              minHeight: 137,
              height: 137,
            }}
            styleInput={{color: '#91939F'}}
            errorMessage={errorMessage.condition}
            showError={errorMessage.condition ? true : false}
          />
          <Offset mb={20} />

          {/* Ваш e-mail */}
          <FormInput
            title="Посилання на анкету / пост"
            value={stateOpportunities.link || ''}
            placeholder="https://docs.google.com/forms/d/e/1FAIpQ"
            setValue={text => handleInputChange('link', text)}
            style={{
              backgroundColor: 'trsndparent',
              borderWidth: 1,
              borderColor: '#5E5F6B',
              minHeight: 37,
              height: 37,
            }}
            styleInput={{color: '#91939F'}}
            errorMessage={errorMessage.link}
            showError={errorMessage.link ? true : false}
          />
          <Offset mb={20} />
          {/* Твої контакти */}
          <FormInput
            title="Твої контакти"
            value={stateOpportunities.email || ''}
            placeholder="your@email.com"
            setValue={text => handleInputChange('email', text)}
            style={{
              backgroundColor: 'trsndparent',
              borderWidth: 1,
              borderColor: '#5E5F6B',
              minHeight: 37,
              height: 37,
            }}
            styleInput={{color: '#91939F'}}
            errorMessage={errorMessage.email}
            showError={errorMessage.email ? true : false}
          />

          <Offset mb={30} />

          <Button
            onPress={handleDone}
            stylesWrap={styles.btnDoneWrap}
            stylesText={styles.btnDoneText}
            title="Опублікувати можливість"
            preloader={isLoading}
          />
          <Offset mb={30} />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default CustomOpportunities;
