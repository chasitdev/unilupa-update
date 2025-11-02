import CheckBox from '../../CheckBox/CheckBox';
import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const NotThisYearCheckBox = ({isActive, onToggle}) => (
  <TouchableOpacity style={styles.checkboxContainer} onPress={onToggle}>
    <CheckBox isActive={isActive} />
    <TextTitle
      fontSize={14}
      fontWeight="400"
      lineHeight={16}
      style={styles.checkboxLabel}>
      Я вступаю не цього року
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  checkboxLabel: {
    marginLeft: 10,
    color: '#91939F',
  },
});

export default NotThisYearCheckBox;
