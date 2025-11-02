import {StackScreenBottomMenu} from 'src/types/screens.type';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {icon} from 'src/assets/icons';
import React from 'react';
import HomeStack from './mainScreen/HomeStackNav';
import {mainTabs, menuList} from 'src/types/menu-tab.enum';
import Header from 'src/ui/Header/Header';
import TabBar from 'src/ui/TabBar/TabBar';
import OpportunitiesStack from './Opportunities/OpportunitiesStack';
import WishlistStackOpportunities from './Wishlist/WishlistStackOpportunities';
import WishlistStackUniversity from './Wishlist/WishlistStackUniversity';
import ProfileStack from './Profile/ProfileStack';

interface IMainNavigation {
  activeTab: string;
  handleChangeTabs: (nameScreen: menuList) => void;
}

const Tab = createBottomTabNavigator();
const NavigationMainMenu: React.FC<IMainNavigation> = ({
  activeTab,
  handleChangeTabs,
}: IMainNavigation) => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <TabBar {...props} />}>
        <Tab.Screen
          name={StackScreenBottomMenu.HOME}
          component={HomeStack}
          options={{
            headerShown: false, // полностью убирает header
            // headerStyle: { //Настраивает стиль контейнера заголовка (фон, тень, границы)
            //   backgroundColor: '#2196F3',
            //   elevation: 0, // убирает тень на Android
            //   shadowOpacity: 0, // убирает тень на iOS
            // },
            // title: 'Поиск', // отображается в заголовке
            // headerTintColor: '#fff', // цвет текста и кнопок в header
            // headerTitleAlign: 'center', // Выравнивание заголовка
            // headerTitle: () => ( //Позволяет задать кастомный компонент или текст вместо обычного title
            //   <Text style={{fontWeight: 'bold', fontSize: 18}}>🔍 Поиск</Text>
            // ),
            // headerRight: () => ( //Кнопка/элемент в правой части заголовка
            //   <TouchableOpacity onPress={() => alert('Настройки')}>
            //     <Ionicons
            //       name="settings-outline"
            //       size={24}
            //       color="#fff"
            //       style={{marginRight: 15}}
            //     />
            //   </TouchableOpacity>
            // ),
            // gestureEnabled: false, // отключает свайпы назад
            header: () => <Header title="HomeStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Університети',
            tabBarIcon: icon.homeBar,
            hideTabBarButton: false,
            animationEnabled: true, //Включает/отключает анимацию перехода между экранами
            ...({activeTabBarIcon: icon.activeHomeBar} as any),
          }}
          listeners={{
            focus: () => handleChangeTabs(mainTabs.MAIN),
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.Opportunities}
          component={OpportunitiesStack}
          options={{
            headerShown: false,
            header: () => <Header title="Opportunities" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Можливості',
            tabBarIcon: icon.bulb,
            hideTabBarButton: false,
            animationEnabled: true,
            ...({activeTabBarIcon: icon.activeBulb} as any),
          }}
          listeners={{
            focus: () => handleChangeTabs(mainTabs.OPPORTUNITIES),
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.WISHLIST}
          component={WishlistStackOpportunities}
          options={{
            headerShown: false,
            header: () => <Header title="WishlistStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Збережені',
            tabBarIcon: icon.savedBar,
            animationEnabled: true,
            activeTabBarIcon: icon.activeSavedBar,
            ...({
              hideTabBarButton:
                activeTab === mainTabs.WISHLIST ||
                activeTab === mainTabs.WISHLIST_OPPORTUNITIES ||
                activeTab === mainTabs.WISHLIST_UNIVERSITY
                  ? true
                  : false,
            } as any),
          }}
          listeners={{
            focus: () => handleChangeTabs(mainTabs.WISHLIST),
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.WISHLIST_OPPORTUNITIES}
          component={WishlistStackOpportunities}
          options={{
            headerShown: false,
            header: () => <Header title="WishlistStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Збережені Можливості',
            tabBarIcon: icon.savedBar,
            animationEnabled: true,
            activeTabBarIcon: icon.activeSavedBar,
            ...({
              hideTabBarButton:
                activeTab === mainTabs.WISHLIST ||
                activeTab === mainTabs.WISHLIST_OPPORTUNITIES ||
                activeTab === mainTabs.WISHLIST_UNIVERSITY
                  ? false
                  : true,
            } as any),
            ...({
              forceActive:
                activeTab === mainTabs.WISHLIST ||
                activeTab === mainTabs.WISHLIST_OPPORTUNITIES,
            } as any),
          }}
          listeners={{
            focus: () => handleChangeTabs(mainTabs.WISHLIST_OPPORTUNITIES),
          }}
        />
        <Tab.Screen
          name={StackScreenBottomMenu.WISHLIST_UNIVERSITY}
          component={WishlistStackUniversity}
          options={{
            headerShown: false,
            header: () => <Header title="WishlistStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Збережені Університети',
            tabBarIcon: icon.savedBar,
            activeTabBarIcon: icon.activeSavedBar,
            animationEnabled: true,
            ...({
              hideTabBarButton:
                activeTab === mainTabs.WISHLIST ||
                activeTab === mainTabs.WISHLIST_OPPORTUNITIES ||
                activeTab === mainTabs.WISHLIST_UNIVERSITY
                  ? false
                  : true,
            } as any),
          }}
          listeners={{
            focus: () => handleChangeTabs(mainTabs.WISHLIST_UNIVERSITY),
          }}
        />

        <Tab.Screen
          name={StackScreenBottomMenu.PROFILE}
          component={ProfileStack}
          options={{
            headerShown: false,
            header: () => <Header title="ProfileStack" />,
            tabBarShowLabel: false,
            tabBarLabel: 'Профіль',
            tabBarIcon: icon.profileBar,
            activeTabBarIcon: icon.activeProfileBar,
            animationEnabled: true,
            hideTabBar: false,
            hideTabBarButton: true,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default NavigationMainMenu;

// {/* <Tab.Screen
// name={StackScreenBottomMenu.TRACKER}
// component={TrackerStack}
// options={{
//   headerShown: false,
//   header: () => <Header title="TrackerStack" />,
//   tabBarShowLabel: false,
//   tabBarLabel: 'Трекер',
//   tabBarIcon: icon.trackerBar,
//   activeTabBarIcon: icon.activeTrackerBar,
//   hideTabBar: false,
//   hideTabBarButton: false,
// }}
// listeners={{
//     focus: ()=>handleChangeTabs(mainTabs.TRACKER)
//   }}
// /> */}
