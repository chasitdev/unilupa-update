import {baseApiUrl} from '@api/config';
import {Navigation} from 'src/navigation/types/navigation.type';
import FormInput from '../../ui/Text/FormInput';
import ButtonSignIn from '../../ui/ScreenView/SignInScreen/ButtonSignIn';
import TextCustom from '../../ui/Text/TextCustom';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import {getCurrentHeightSize} from '@utils/currentSize';
import {validateEmail} from '@utils/validation/email-validation';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface Props {
  navigation: Navigation;
}

const ForgotPassword: React.FC<Props> = props => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const forgotPassword = async () => {
    try {
      const emailValidation = await validateEmail(email);
      setEmailError(emailValidation.error);

      if (!emailValidation.success) {
        return;
      }

      const response = await fetch(`${baseApiUrl}/auth/send-new-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email}),
      });

      if (!response.ok) {
        throw new Error('Failed to send code');
      }

      props.navigation.navigate({
        name: StackScreenBottomMenu.AUTHORIZATION,
        params: {
          screen: AuthorizationScreen.CONFIRM_EMAIL,
          params: {
            email: email,
          },
        },
      });
    } catch (error: any) {
      console.error('Error during forgot password:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      setEmailError('Не вдалось надіслати код');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.content}>
        <View style={styles.topRectangle}>
          <TextCustom fontSize={32} fontWeight="600" lineHeight={38}>
            Відновити пароль
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
        </View>
      </View>
      <View
        style={{
          width: '100%',
          paddingHorizontal: 32,
          marginBottom: 32,
        }}>
        <ButtonSignIn text="Відновити" onPress={forgotPassword} />
      </View>
      <View style={styles.footer}>
        <TextCustom
          fontSize={14}
          fontWeight="600"
          lineHeight={17}
          color="#53A1FF"
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
          Повернутися
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

export default ForgotPassword;
