import TextTitle from '../ui/TextTitle';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

const SkipButton = ({onPress}) => (
  <TouchableOpacity style={styles.skipButton} onPress={onPress}>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19}>
      Пропустити
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  skipButton: {},
});

export default SkipButton;
