import TextTitle from '../Text/TextCustom';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  state: any;
  descriptors: {
    [key: string]: any;
  };
  navigation: any;
}

const TabBar: React.FC<Props> = props => {
  const key = props.state.routes[props.state.index].key;
  const options = props.descriptors[key].options;

  if (options.hideTabBar) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.tabBar}>
        {props.state.routes.map((route: any, index: any) => {
          const {options} = props.descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          // Проверка: является ли кнопка активной (либо принудительно, либо реально)
          const isFocused = props.state.index === index;
          const showAsActive = isFocused || options.forceActive;

          const onPress = () => {
            const event = props.navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!isFocused && !event.defaultPrevented) {
              props.navigation.navigate(route.name);
            }
          };

          if (options.hideTabBarButton) {
            return null;
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.customButton}
              onPress={onPress}>
              {isFocused}

              <View style={styles.icon}>
                <Image
                  style={styles.navIcon}
                  source={
                    // isFocused ? options.activeTabBarIcon : options.tabBarIcon
                    showAsActive ? options.activeTabBarIcon : options.tabBarIcon
                  }
                />

                <TextTitle
                  fontSize={12}
                  lineHeight={18}
                  fontWeight="500"
                  color={showAsActive ? 'white' : '#91939F'}>
                  {label}
                </TextTitle>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '13%',
    width: '100%',
  },
  tabBar: {
    backgroundColor: '#202026',
    height: '100%',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
  },
  customButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
  },
});

export default TabBar;
