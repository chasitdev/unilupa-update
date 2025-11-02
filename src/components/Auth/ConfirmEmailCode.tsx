import {baseApiUrl} from '@api/config';
import {Navigation} from 'src/navigation/types/navigation.type';
import FormInput from '../../ui/Text/FormInput';
import ButtonSignIn from '../../ui/ScreenView/SignInScreen/ButtonSignIn';
import TextCustom from '../../ui/Text/TextCustom';
import {
  AuthorizationScreen,
  StackScreenBottomMenu,
} from 'src/types/screens.type';
import {useRoute} from '@react-navigation/native';
import {getCurrentHeightSize} from '@utils/currentSize';
import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
interface Props {
  navigation: Navigation;
}

const ConfirmEmailCode: React.FC<Props> = props => {
  const [code, setCode] = useState('');
  const [codeError, setCodeError] = useState('');

  const route: any = useRoute();
  const email = route.params.email;

  const confirmCode = async () => {
    try {
      const response = await fetch(`${baseApiUrl}/auth/check-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email, code}),
      });

      if (!response.ok) {
        throw new Error('Failed to send code');
      }
      const data = await response.json();
      console.log(data);

      props.navigation.navigate({
        name: StackScreenBottomMenu.AUTHORIZATION,
        params: {
          screen: AuthorizationScreen.RESET_PASSWORD,
          params: {
            email: email,
            code: code,
          },
        },
      });
    } catch (error: any) {
      console.error('Error during check:', error);
      if (error.response) {
        console.error('Error response:', error.response);
      }
      setCodeError('Невірний код');
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      scrollEnabled={false}>
      <View style={styles.content}>
        <View style={styles.topRectangle}>
          <TextCustom fontSize={32} fontWeight="600" lineHeight={38}>
            Підтвердження коду
          </TextCustom>
        </View>

        <View style={styles.formContainer}>
          <FormInput
            title="Код"
            placeholder="Введіть код"
            value={code}
            setValue={setCode}
            errorMessage={codeError}
            styleError={{bottom: -22, right: 0}}
            showError={!!codeError}
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
        <ButtonSignIn text="Перевірити" onPress={confirmCode} />
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

export default ConfirmEmailCode;
