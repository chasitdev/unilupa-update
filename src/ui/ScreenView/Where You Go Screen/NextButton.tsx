import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const NextButton = ({onPress}) => (
  <TouchableOpacity style={styles.profileSetupButton} onPress={onPress}>
    <TextTitle style={styles.buttonText}>Далі</TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileSetupButton: {
    backgroundColor: '#0E46F1',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default NextButton;
