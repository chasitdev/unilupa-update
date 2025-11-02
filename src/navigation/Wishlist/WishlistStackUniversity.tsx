import {WishlistPath} from 'src/types/screens.type';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import SavedUniversityScreen from 'src/components/Auth/SavedUniversityScreen';
import UniversityInformationScreen from 'src/components/Auth/UniversityInformationScreen';

const Stack = createStackNavigator();

const WishlistStackUniversity = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={WishlistPath.WISHLIST_UNIVERSITY}
        component={SavedUniversityScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={WishlistPath.WISHLIST_UNIVERSITY_DETAIL}
        component={UniversityInformationScreen}
        initialParams={{prevPage: WishlistPath.WISHLIST_UNIVERSITY}}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default WishlistStackUniversity;
