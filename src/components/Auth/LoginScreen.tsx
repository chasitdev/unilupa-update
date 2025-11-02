import {baseApiUrl} from '@api/config';
import useAuth from 'src/hooks/auth/useAuth';
import {Navigation} from 'src/navigation/types/navigation.type';
import FormInput from '../../ui/Text/FormInput';
import GoogleAppleButtons from '../../ui/ScreenView/SignInScreen/ButtonGoogleApple';
import ButtonSignIn from '../../ui/ScreenView/SignInScreen/ButtonSignIn';
import TextCustom from '../../ui/Text/TextCustom';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import appleAuth from '@invertase/react-native-apple-authentication';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useRoute} from '@react-navigation/native';
import {getCurrentHeightSize} from '@utils/currentSize';
import {validateEmail} from '@utils/validation/email-validation';
import {validateLoginPassword} from '@utils/validation/password-validation';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface Props {
  navigation: Navigation;
}

const LoginScreen: React.FC<Props> = props => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const route: any = useRoute();
  const paramEmail = route.params.email;

  useEffect(() => {
    if (paramEmail) {
      setEmail(paramEmail);
    }
  }, [paramEmail]);

  const auth = useAuth();
  const login = async () => {
    try {
      const emailValidation = await validateEmail(email);
      const passwordValidation = await validateLoginPassword(password);
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

      auth.login(data.access_token);
    } catch (error: any) {
      console.error('Error during login:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      setPasswordError('Логін або пароль неправильний');
    }
  };

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
      console.log('User Info:', userInfo);

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

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.content}>
        <View style={styles.topRectangle}>
          <TextCustom fontSize={32} fontWeight="600" lineHeight={38}>
            Вхід
          </TextCustom>
        </View>

        <View style={styles.formContainer}>
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
            placeholder="Введіть пароль"
            value={password}
            setValue={setPassword}
            errorMessage={passwordError}
            styleError={{bottom: -22, right: 0}}
            showError={!!passwordError}
            isPassword={true}
          />
          <View style={styles.button}>
            <ButtonSignIn text="Увійти" onPress={login} />

            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                gap: 5,
              }}>
              <TextCustom
                fontSize={14}
                fontWeight="400"
                lineHeight={17}
                color="#91939F">
                Забули пароль?
              </TextCustom>

              <TextCustom
                fontSize={14}
                fontWeight="600"
                lineHeight={17}
                color="#53A1FF"
                onPress={() => {
                  props.navigation.navigate({
                    name: StackScreenBottomMenu.AUTHORIZATION,
                    params: {
                      screen: AuthorizationScreen.FORGOT_PASSWORD,
                      params: {
                        test: 'fewf',
                      },
                    },
                  });
                }}>
                Відновити
              </TextCustom>
            </View>
          </View>
        </View>
      </View>
      <View>
        <GoogleAppleButtons
          headerText={'Увійдіть за допомогою'}
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
          Немає профілю?
        </TextCustom>

        <TextCustom
          fontSize={14}
          fontWeight="600"
          lineHeight={17}
          color="#53A1FF"
          onPress={() => {
            props.navigation.navigate({
              name: StackScreenBottomMenu.AUTHORIZATION,
              params: {
                screen: AuthorizationScreen.REGISTRATION,
                params: {
                  test: 'fewf',
                },
              },
            });
          }}>
          Зареєструватися
        </TextCustom>
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
    paddingBottom: 36,
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
    marginTop: 50,
    width: '100%',
  },
  content: {
    flex: 1,
  },
});

export default LoginScreen;
