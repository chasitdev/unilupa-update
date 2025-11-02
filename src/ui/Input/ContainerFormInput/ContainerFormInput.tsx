import React from 'react'
import { View } from 'react-native';
import styles from './styles/container-form-input-styles.ts';

interface IProps{
    bgc?: string;
    children: React.ReactNode;
    style?: Object;
}
const ContainerFormInput:React.FC<IProps> = ({
  bgc,
  style,
  children
}) => {
  let customStyle = {};
  if(style) {customStyle={...style}};
  if(bgc){customStyle = {...customStyle, backgroundColor: bgc}};
  return (
    <View style={{...styles.container, ...customStyle}}>
        {children}
    </View>
  )
}

export default ContainerFormInput