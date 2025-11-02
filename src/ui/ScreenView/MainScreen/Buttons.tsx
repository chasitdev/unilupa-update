import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextTitle from '../ui/TextTitle';

const CustomButtonMainScreen = ({title, onPress, isSelected}) => {
  const buttonStyle = isSelected
    ? [styles.button, styles.selected]
    : styles.button;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <TextTitle fontSize={16} fontWeight="600">
        {title}
      </TextTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#202026',
    borderRadius: 8,
    borderColor: '#3D3B3E',
    borderWidth: 1,
    padding: 12,
    paddingHorizontal: 24,
    alignItems: 'center',
    textAlignVertical: 'center',
  },
  selected: {
    alignItems: 'center',
    textAlignVertical: 'center',
    backgroundColor: '#0E46F1',
    borderWidth: 0,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  selectedText: {
    color: 'white',
  },
});

export default CustomButtonMainScreen;
