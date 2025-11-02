import {AuthorizationScreen} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ChooseEducationScreen from 'src/components/Education Screen/ChooseEducationScreen';
import RegistrationScreen from 'src/components/Auth/RegistrationScreen';
import LoginScreen from 'src/components/Auth/LoginScreen';
import LocationScreen from 'src/components/Auth/LocationScreen';
import WelcomeScreen from 'src/components/Auth/WelcomeScreen';
import WhereYouGoScreen from 'src/components/Auth/WhereYouGoScreen';
import ForgotPassword from 'src/components/Auth/ForgotPassword';
import ConfirmEmailCode from 'src/components/Auth/ConfirmEmailCode';
import ResetPassword from 'src/components/Auth/ResetPassword';

const Stack = createStackNavigator();

const AuthorizationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={AuthorizationScreen.REGISTRATION}
        component={RegistrationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AuthorizationScreen.LOGIN}
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthorizationScreen.CHOOSE_EDUCATION}
        component={ChooseEducationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AuthorizationScreen.LOCATION}
        component={LocationScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AuthorizationScreen.WELCOME}
        component={WelcomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={AuthorizationScreen.WHERE_YOU_GO}
        component={WhereYouGoScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthorizationScreen.FORGOT_PASSWORD}
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthorizationScreen.CONFIRM_EMAIL}
        component={ConfirmEmailCode}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={AuthorizationScreen.RESET_PASSWORD}
        component={ResetPassword}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthorizationStack;
