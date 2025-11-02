import {Navigation} from 'src/navigation/types/navigation.type';
import {HomeScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../ui/TextTitle';

interface Props {
  navigation: Navigation;
}

const SearchBar: React.FC<Props> = props => {
  const find = async () => {
    props.navigation.navigate({
      name: StackScreenBottomMenu.HOME,
      params: {
        screen: HomeScreen.FIND,
      },
    });
  };

  return (
    <TouchableOpacity style={styles.container} onPress={find}>
      <View style={styles.leftIcon}>
        <TouchableOpacity>
          <Image source={icon.search} style={styles.icon} />
        </TouchableOpacity>

        <TextTitle
          fontWeight="400"
          fontSize={14}
          lineHeight={18}
          color="#5E5F6B"
          style={styles.text}>
          {'\u00A0\u00A0\u00A0\u00A0'}Пошук
        </TextTitle>
      </View>

      <View style={styles.rightIcons}>
        <Image source={icon.line} style={styles.line} />
        <Image source={icon.filter} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 8,
    marginTop: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
  leftIcon: {
    flexDirection: 'row',
  },
  text: {
    marginTop: 3,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
  line: {
    width: 2,
    height: 24,
    marginRight: 10,
  },
});

export default SearchBar;
