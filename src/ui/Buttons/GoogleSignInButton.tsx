import {color} from '@utils/colors';
import {icon} from 'src/assets/icons';
import React from 'react';
import StyledButton from './StyledButton';

import {GoogleSignin} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId:
    '497390091212-52re1vcinavi2255s7gjgnirvt9kfe2a.apps.googleusercontent.com',
  iosClientId:
    '497390091212-lpoeuuoqadjgcaml4p80d5ma80fnt7en.apps.googleusercontent.com',
});

interface Props {}

const GoogleSignInButton: React.FC<Props> = () => {
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // // console.log(userInfo);
      // Тут ви можете використовувати дані користувача, як вам потрібно
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <StyledButton
      iconLeftPng={icon.png.google}
      iconSize={24}
      onPress={() => {
        signIn();
      }}
      title="Continue with Google"
      color={color.buttonDark}
      borderColor={color.borderPrimary}
    />
  );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
// });

export default GoogleSignInButton;
