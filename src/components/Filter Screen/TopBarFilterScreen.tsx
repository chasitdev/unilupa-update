import TextTitle from '../../../src/ui/Text/TextCustom';
import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

interface Props {
  onResetFilters: () => void;
  onBackPress: () => void;
  title: string;
}

const TopBarFilterScreen: React.FC<Props> = props => {
  return (
    <View style={styles.top}>
      <TouchableOpacity style={styles.topButton} onPress={props.onBackPress}>
        <Image source={icon.backIcon} style={styles.icon} />
      </TouchableOpacity>
      <TextTitle
        fontSize={20}
        fontWeight="600"
        lineHeight={24}
        color="white"
        style={styles.titleText}>
        {props.title}
      </TextTitle>

      <TouchableOpacity style={styles.topButton} onPress={props.onResetFilters}>
        <Image source={icon.filterDelete} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 15,
  },
  topButton: {
    backgroundColor: '#0E46F1',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  titleText: {
    textAlign: 'center',
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default TopBarFilterScreen;
