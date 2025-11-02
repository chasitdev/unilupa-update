import {ProfileScreen} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UserScreen from 'src/components/Profile/UserScreen';
import EditUserScreen from 'src/components/Profile/Detail/EditUserScreen';
import SettingsScreen from 'src/components/Profile/Detail/SettingsScreen';
import LocationScreenSettings from 'src/components/Profile/Detail/LocationScreenSettings';
import WhereYouGoScreenSettings from 'src/components/Profile/Detail/WhereYouGoScreenSettings';
import ChooseEducationScreenSettings from 'src/components/Profile/Detail/ChooseEducationScreenSettings';
import ResultsNMTScreen from 'src/components/Profile/Detail/ResultsNMT';
import MyInterestSetting from 'src/components/Profile/Detail/MyInterestSetting';
import { MyPosts } from 'src/screens/Opportunities/MyPosts';

const Stack = createStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={ProfileScreen.USER}
        component={UserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.EDIT_PROFILE}
        component={EditUserScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.EDIT_MY_INTEREST}
        component={MyInterestSetting}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.SETTINGS}
        component={SettingsScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.LOCATION_SETTINGS}
        component={LocationScreenSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.WHERE_YOU_GO_SETTINGS}
        component={WhereYouGoScreenSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={ProfileScreen.CHOOSE_EDUCATION_SETTINGS}
        component={ChooseEducationScreenSettings}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ProfileScreen.RESULTS_NMT}
        component={ResultsNMTScreen}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={ProfileScreen.MY_POSTS}
        component={MyPosts}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
