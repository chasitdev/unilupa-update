import {color} from '@utils/colors';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  isActive: boolean;
}
const RadioCircle: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.container,
        props.isActive ? styles.active : styles.inactive,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20,
  },
  inactive: {
    borderWidth: 1,
    borderColor: color.borderPrimary,
    borderRadius: 50,
  },
  active: {
    borderWidth: 6,
    borderColor: color.buttonPrimary,
    borderRadius: 50,
  },
});

export default RadioCircle;
