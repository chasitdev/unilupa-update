import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import {StorageEnum} from 'src/navigation/types/storage.type';
import CheckBox from '../../ui/CheckBox/CheckBox';
import FormInput from '../../ui/Text/FormInput';
import GoogleAppleButtons from '../../ui/ScreenView/SignInScreen/ButtonGoogleApple';
import ButtonSignIn from '../../ui/ScreenView/SignInScreen/ButtonSignIn';
import TextCustom from '../../ui/Text/TextCustom';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import appleAuth from '@invertase/react-native-apple-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {RouteProp} from '@react-navigation/native';
import {getCurrentHeightSize} from '@utils/currentSize';
import {validateEmail} from '@utils/validation/email-validation';
import {validateSignUpPassword} from '@utils/validation/password-validation';
import {validateText} from '@utils/validation/text-validation';
import React, {useState} from 'react';
import {Alert, StyleSheet, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {api} from 'src/api/api';

interface Props {
  navigation: Navigation;
  route: RouteProp<Record<string, {test: string}>, 'key'>;
}

const RegistrationScreen: React.FC<Props> = props => {
  const [notifications, setNotifications] = useState(false);
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const auth = useAuth();

  GoogleSignin.configure({
    scopes: [],
    webClientId:
      '217025062473-ppen7lv1htv4pocdtsvbsvb2k2lctimq.apps.googleusercontent.com',
    iosClientId:
      '217025062473-hbprllmoaasrd0s3d09d2o7up50teskg.apps.googleusercontent.com',
    offlineAccess: true,
    forceCodeForRefreshToken: true,
    profileImageSize: 120,
  });

  const signInGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      const idToken = userInfo.idToken;

      const response = await fetch(`${baseApiUrl}/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({token: idToken}),
      });

      const data = await response.json();
      if (data.access_token) {
        auth.login(data.access_token);
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    }
  };

  const signInApple = async () => {
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });
      const {identityToken, nonce} = appleAuthRequestResponse;

      if (identityToken) {
        const response = await fetch(`${baseApiUrl}/auth/apple`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({token: identityToken, nonce}),
        });

        const data = await response.json();
        if (data.access_token) {
          auth.login(data.access_token);
        }
      } else {
        throw new Error('Apple Sign-In failed - no identity token returned');
      }
    } catch (error) {
      console.error('Error during Apple Sign-In:', error);
    }
  };
  async function registration() {
    try {
      const nameValidation = await validateText(name);
      const emailValidation = await validateEmail(email);
      const passwordValidation = await validateSignUpPassword(password);
      setEmailError(emailValidation.error);
      setPasswordError(passwordValidation.error);
      setNameError(nameValidation.error);

      if (
        !emailValidation.success ||
        !passwordValidation.success ||
        !nameValidation.success
      ) {
        return;
      }
      const response = await fetch(`${baseApiUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
          isEmailNotification: notifications,
        }),
      });

      if (!response.ok) {
        setEmailError('Цей email вже зареєстрований');
      }

      // const data = await response.json();
      const login = async () => {
        try {
          const emailValidation = await validateEmail(email);
          const passwordValidation = await validateSignUpPassword(password);
          setEmailError(emailValidation.error);
          setPasswordError(passwordValidation.error);
          if (!emailValidation.success || !passwordValidation.success) {
            return;
          }

          const response = await fetch(`${baseApiUrl}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({email, password}),
          });

          if (!response.ok) {
            throw new Error('Failed to login');
          }
          const data = await response.json();

          await AsyncStorage.setItem(
            StorageEnum.accessToken,
            data.access_token,
          );

          props.navigation.navigate({
            name: StackScreenBottomMenu.AUTHORIZATION,
            params: {
              screen: AuthorizationScreen.WELCOME,
            },
          });
        } catch (error) {
          Alert.alert('Помилка входу');
        }
      };

      if (response.ok) {
        login();
      } else {
        // throw new Error(data.message || 'Не вдалось зареєструватися');
      }
    } catch (error) {
      // Alert.alert('Помилка реєстрації', error.message);
    }
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.content}>
        <View style={styles.topRectangle}>
          <TextCustom fontSize={32} fontWeight="600" lineHeight={38}>
            Реєстрація
          </TextCustom>
        </View>
        <View style={styles.formContainer}>
          <FormInput
            title="Імʼя"
            placeholder="Введіть імʼя профілю"
            value={name}
            setValue={setName}
            errorMessage={nameError}
            styleError={{bottom: -22, right: 0}}
            showError={!!nameError}
            isPassword={false}
          />
          <FormInput
            title="Пошта"
            placeholder="Введіть адресу електронної пошти"
            value={email}
            setValue={setEmail}
            errorMessage={emailError}
            styleError={{bottom: -22, right: 0}}
            showError={!!emailError}
            isPassword={false}
          />
          <FormInput
            title="Пароль"
            placeholder="Створіть пароль"
            value={password}
            setValue={setPassword}
            errorMessage={passwordError}
            styleError={{bottom: -22, right: 0}}
            showError={!!passwordError}
            isPassword={true}
          />
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setNotifications(!notifications)}>
            <CheckBox isActive={notifications} />
            <TextCustom
              fontSize={14}
              fontWeight="400"
              lineHeight={17}
              style={styles.checkboxLabel}>
              Я погоджуюсь отримувати додаткову інформацію та оновлення на свою
              електронну пошту
            </TextCustom>
          </TouchableOpacity>
          <View style={styles.button}>
            <ButtonSignIn text="Зареєструватися" onPress={registration} />
          </View>
        </View>
      </View>
      <View>
        <GoogleAppleButtons
          headerText={'Зареєструйтесь за допомогою'}
          onApplePress={signInApple}
          onGooglePress={signInGoogle}
        />
      </View>
      <View style={styles.footer}>
        <TextCustom
          fontSize={14}
          fontWeight="400"
          lineHeight={17}
          color="#91939F">
          У вас вже є профіль?
        </TextCustom>
        <TouchableOpacity
          onPress={() => {
            props.navigation.navigate({
              name: StackScreenBottomMenu.AUTHORIZATION,
              params: {
                screen: AuthorizationScreen.LOGIN,
                params: {
                  test: 'fewf',
                },
              },
            });
          }}>
          <TextCustom
            fontSize={14}
            fontWeight="600"
            lineHeight={17}
            color="#53A1FF">
            Увійти
          </TextCustom>
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'space-between',
    backgroundColor: 'black',
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 32,
    gap: 16,
    marginTop: 54,
  },
  topRectangle: {
    backgroundColor: '#202026',
    width: '100%',
    height: getCurrentHeightSize(150, 150, 932),
    borderBottomLeftRadius: 64,
    borderWidth: 1,
    borderBottomColor: '#3D3B3E',
    borderLeftColor: '#3D3B3E',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingBottom: 32,
    paddingLeft: 32,
  },
  footer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    gap: 5,
  },

  topContainer: {
    gap: 60,
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  content: {
    flex: 1,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 5,
  },
  checkboxLabel: {
    marginLeft: 10,
    flex: 1,
    color: '#91939F',
    paddingRight: 10,
  },
});

export default RegistrationScreen;
