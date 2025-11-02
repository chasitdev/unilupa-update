import TextCustom from './TextCustom.tsx';
import React from 'react';
import {Image} from 'react-native';
import styles from './styles/title.style.ts';

interface IProps {
  title?: string;
  location?: 'left' | 'center' | 'right';
  fontSize?: number;
  iconLeft?: any;
  iconLeftStyle?: Object;
}

const TextTitle: React.FC<IProps> = ({
  title = 'Куди ти вступаєш цього року?',
  location = 'center',
  fontSize = 32,
  iconLeft,
  iconLeftStyle,
}) => (
  <TextCustom
    fontSize={fontSize}
    fontWeight="600"
    lineHeight={32}
    style={{
      textAlign: `${location}`,
    }}>
    {iconLeft && (
      <Image source={iconLeft} style={{...styles.iconLeft, ...iconLeftStyle}} />
    )}
    {iconLeft && '  '}
    {title}
  </TextCustom>
);

export default TextTitle;
