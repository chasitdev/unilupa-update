import React from 'react';
import {ActivityIndicator, StyleProp, View, ViewStyle} from 'react-native';

interface IProps {
  style?: StyleProp<ViewStyle>;
}

const Preloader: React.FC<IProps> = ({style = {}}) => {
  return (
    <View
      style={{
        height: '100%',
        backgroundColor: 'transparent',
        display: 'flex',
        position: 'absolute',
        alignContent: 'center',
        justifyContent: 'center',
        right: 10,
        top: 2,
        ...style,
      }}>
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Preloader;
