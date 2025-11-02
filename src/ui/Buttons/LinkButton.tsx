import React from 'react';
import TextCustom from '../Text/TextCustom';

const LinkButton = ({title, onPress}: {title: string; onPress: () => void}) => {
  return (
    <TextCustom
      fontSize={16}
      fontWeight="400"
      color="#0088FFFF"
      onPress={onPress}>
      {title}
    </TextCustom>
  );
};

export default LinkButton;
