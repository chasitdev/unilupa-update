import {filterStyles} from '@utils/filterStyle';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  isActive?: boolean;
}
const LoaderToggle: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.container,
        filterStyles({
          backgroundColor: props.isActive ? '#EDC65C' : '#FFFDF6',
          width: props.isActive ? 40 : 23,
        }),
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: 8,
    width: 23,
    borderRadius: 50,
    backgroundColor: '#FFFDF6',
  },
});

export default LoaderToggle;
