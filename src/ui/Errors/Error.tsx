import React from 'react';
import TextCustom from '../Text/TextCustom';
import {StyleProp, View, ViewStyle} from 'react-native';
import {color} from 'src/utils/colors';

interface IProps {
  errorMessage: string;
  style?: StyleProp<ViewStyle>;
}

const Error: React.FC<IProps> = ({errorMessage, style}) => {
  if (!errorMessage) return null;
  return (
    <View
      style={[
        {position: 'absolute', bottom: -20, left: 0, zIndex: 1000},
        style,
      ]}>
      <TextCustom
        color={color.errorText}
        fontWeight="400"
        fontSize={13}
        lineHeight={24}>
        {errorMessage}
      </TextCustom>
    </View>
  );
};

export default Error;
Error.displayName = 'Error';
