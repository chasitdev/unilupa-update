import {color} from '@utils/colors';
import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

interface Props {
  isActive: boolean;
  size?: number;
}
const CheckBox: React.FC<Props> = props => {
  return (
    <View style={props.isActive ? styles.active : styles.inactive}>
      {props.isActive && <Image source={icon.check} style={styles.icon} />}
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 14,
    height: 14,
  },
  inactive: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  active: {
    width: 20,
    height: 20,
    borderRadius: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: color.primary,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default CheckBox;
