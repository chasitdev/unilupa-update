import React, {ReactNode} from 'react';
import {View, StyleSheet} from 'react-native';
import {color} from '../../utils/colors';
import {filterStyles} from '../../utils/filterStyle';

interface Props {
  children: ReactNode;
  padding?: number;
}

const FrameView: React.FC<Props> = props => {
  return (
    <View
      style={[
        styles.container,
        filterStyles({
          padding: props.padding,
        }),
      ]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: color.primary,
    padding: 16,
  },
});

export default FrameView;
