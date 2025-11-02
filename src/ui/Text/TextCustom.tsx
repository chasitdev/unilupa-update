import React, {ReactNode} from 'react';
import {Text, StyleProp, TextStyle, TouchableOpacity} from 'react-native';
import {filterStyles} from '@utils/filterStyle';
import {FontWeight} from 'src/types/global.type';
import {RFValue} from 'react-native-responsive-fontsize';
import {styles} from './styles/custom-text';

export interface StyledTextProps {
  children: ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  fontSize?: number;
  fontFamily?: 'Raleway' | 'Inter' | 'Caudex';
  fontWeight?: FontWeight;
  lineHeight?: number;
  textAlign?: 'center' | 'left' | 'right';
  underline?: boolean;
  onPress?: () => void;
}

const TextCustom: React.FC<StyledTextProps> = props => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!props.onPress}
      onPress={props.onPress}>
      <Text
        style={[
          styles.default,
          filterStyles({
            color: props.color,
            fontSize: RFValue(props.fontSize || 20, 932),
            fontFamily: props.fontFamily,
            fontWeight: props.fontWeight,
            lineHeight: props.lineHeight,
            textAlign: props.textAlign,
            textDecorationLine: props.underline ? 'underline' : undefined,
          }),
          props.style,
        ]}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default TextCustom;
