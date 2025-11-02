import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextTitle from '../../Text/TextCustom';

const RegionButton = ({title, onPress, isSelected}) => {
  // Apply conditional styling based on the isSelected prop
  const buttonStyle = isSelected
    ? [styles.button, styles.selected]
    : styles.button;
  const textStyle = isSelected
    ? [styles.buttonText, styles.selectedText]
    : styles.buttonText;

  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress}>
      <TextTitle fontSize={14} style={textStyle}>
        {title}
      </TextTitle>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'black',
    height: 32,
    marginVertical: 5,
    borderRadius: 8,
    padding: 7,
    borderColor: '#8F8F92',
    borderWidth: 1,
  },
  selected: {
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

export default RegionButton;
