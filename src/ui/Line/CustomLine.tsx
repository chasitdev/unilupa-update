import React from 'react';
import {styles} from './styles/line.styles';
import {View} from 'react-native';

interface IProps {
  color?: string;
}
export const CustomLine: React.FC<IProps> = ({color}) => {
  return (
    <View style={[styles.line, {borderColor: color ? color : '#91939F'}]} />
  );
};
