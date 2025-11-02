/* eslint-disable react/no-unstable-nested-components */
import {StackScreenBottomMenu} from 'src/types/screens.type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import AuthorizationStack from './AuthorizationStack';
import TabBar from 'src/ui/TabBar/TabBar';
import Header from 'src/ui/Header/Header';

const Tab = createBottomTabNavigator();

const NavigationAuthorization = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name={StackScreenBottomMenu.AUTHORIZATION}
          component={AuthorizationStack}
          options={{
            headerShown: false,
            header: () => <Header title="AuthorizationStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Головна',
            hideTabBar: true,
            hideTabBarButton: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationAuthorization;
