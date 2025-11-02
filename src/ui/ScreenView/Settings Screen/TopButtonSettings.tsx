import {Navigation} from 'src/navigation/types/navigation.type';
import {ProfileScreen, StackScreenBottomMenu} from 'src/types/screens.type';
import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../../Text/TextCustom';

interface Props {
  navigation: Navigation;
}

const TopButtonSettings: React.FC<Props> = props => {
  return (
    <View style={styles.topContainer}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          props.navigation.navigate({
            name: StackScreenBottomMenu.PROFILE,
            params: {
              screen: ProfileScreen.USER,
              params: {
                test: 'fewf',
              },
            },
          });
        }}>
        <View style={styles.backIcon}>
          <Image source={icon.backIcon} style={styles.icon} />
        </View>
      </TouchableOpacity>
      <View>
        <TextTitle
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          color="white">
          Налаштування
        </TextTitle>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#0E46F1',
    width: 45,
    height: 45,
    justifyContent: 'center',
    borderRadius: 8,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 50,
    alignSelf: 'flex-start',
    gap: 70,
    marginLeft: 20,
  },
  backIcon: {
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TopButtonSettings;
