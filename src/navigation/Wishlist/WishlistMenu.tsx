/* eslint-disable react/no-unstable-nested-components */
import {StackScreenBottomMenu} from 'src/types/screens.type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {icon} from 'src/assets/icons';
import React from 'react';
import Header from '../../../ui/Header/Header';
import TabBar from '../../../ui/TabBar/TabBarEmpty';
import HomeStack from './HomeStack';

const Tab = createBottomTabNavigator();

const WishlistMenu = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name={StackScreenBottomMenu.HOME}
          component={HomeStack}
          options={{
            headerShown: false,
            header: () => <Header title="HomeStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Університети',
            tabBarIcon: icon.homeBar,
            activeTabBarIcon: icon.activeHomeBar,
            hideTabBar: false,
            hideTabBarButton: false,
          }}
        />

        {/* <Tab.Screen
          name={StackScreenBottomMenu.OpportunitiesMenu}
          component={OpportunitiesStack}
          options={{
            headerShown: false,
            header: () => <Header title="Opportunities" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Можливості',
            tabBarIcon: icon.bulb,
            activeTabBarIcon: icon.activeBulb,
            hideTabBar: false,
            hideTabBarButton: false,
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.WISHLIST}
          component={WishlistStack}
          options={{
            headerShown: false,
            header: () => <Header title="WishlistStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Збережені',
            tabBarIcon: icon.savedBar,
            activeTabBarIcon: icon.activeSavedBar,
            hideTabBar: false,
            hideTabBarButton: false,
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.TRACKER}
          component={TrackerStack}
          options={{
            headerShown: false,
            header: () => <Header title="TrackerStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Трекер',
            tabBarIcon: icon.trackerBar,
            activeTabBarIcon: icon.activeTrackerBar,
            hideTabBar: false,
            hideTabBarButton: false,
          }}
        /> */}
        {/* <Tab.Screen
          name={StackScreenBottomMenu.PROFILE}
          component={ProfileStack}
          options={{
            headerShown: false,
            header: () => <Header title="ProfileStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Профіль',
            tabBarIcon: icon.profileBar,
            activeTabBarIcon: icon.activeProfileBar,
            hideTabBar: false,
            hideTabBarButton: false,
          }}
        /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default WishlistMenu;
