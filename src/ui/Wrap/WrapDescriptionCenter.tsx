import React from 'react';
import {styles} from './styles/WrapDescriptionCenter.style.ts';
import {View} from 'react-native';

interface IProps {
  backgroundColor?: string;
  children: React.ReactNode;
}

const WrapDescriptionCenter: React.FC<IProps> = props => {
  return (
    <View
      style={[
        styles.wrapCenter,
        {
          backgroundColor: props.backgroundColor
            ? props.backgroundColor
            : 'transparent',
        },
      ]}>
      {props.children}
    </View>
  );
};

export default WrapDescriptionCenter;
