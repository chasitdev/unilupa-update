import {filterStyles} from '@utils/filterStyle';
import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props {
  margin?: number;
}
const Divider: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.container,
        filterStyles({
          marginVertical: props.margin,
        }),
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 1,
    backgroundColor: '#EAECF0',
    marginVertical: 12,
  },
});

export default Divider;
