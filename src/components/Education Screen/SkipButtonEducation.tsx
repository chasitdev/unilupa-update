import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import TextTitle from '../../ui/Text/TextCustom';

const SkipButtonEducation = ({onPress}) => (
  <TouchableOpacity style={styles.skipButton} onPress={onPress}>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
      Пропустити
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  skipButton: {},
});

export default SkipButtonEducation;
