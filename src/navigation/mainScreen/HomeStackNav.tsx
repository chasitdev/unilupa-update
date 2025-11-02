import {HomeScreen} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import UniversityInformationScreen from 'src/components/Auth/UniversityInformationScreen';
import ComparisonScreen from 'src/components/Auth/ComparisonScreen';
import FindScreen from 'src/screens/MainScreen/FindScreen';
import FilterUniversityModalScreen from 'src/screens/MainScreen/ModalScreen/FilterUniversityModalScreen';

const Stack = createStackNavigator();

const HomeStackNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HomeScreen.FIND}
        component={FindScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name={HomeScreen.FILTER}
        component={FilterUniversityModalScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name={HomeScreen.UNIVERSITY_INFORMATION}
        component={UniversityInformationScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />

      <Stack.Screen
        name={HomeScreen.COMPARISON}
        component={ComparisonScreen}
        options={{
          headerShown: false,
          animationEnabled: true,
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStackNav;
