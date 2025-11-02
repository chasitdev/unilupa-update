import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {TouchableOpacity} from 'react-native';

const SkipButtonLocation = ({onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
      Пропустити
    </TextTitle>
  </TouchableOpacity>
);

export default SkipButtonLocation;
