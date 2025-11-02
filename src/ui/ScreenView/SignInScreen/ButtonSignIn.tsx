import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextTitle from '../../Text/TextCustom';

const ButtonSignIn = ({text, onPress}) => (
  <TouchableOpacity style={[styles.registrationButton]} onPress={onPress}>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
      {text}
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  registrationButton: {
    backgroundColor: '#0E46F1',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default ButtonSignIn;
