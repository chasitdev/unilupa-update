import TextTitle from '../../ui/Text/TextCustom';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const HeaderEducation = () => (
  <View style={styles.headerContainer}>
    <TextTitle fontSize={32} fontWeight="400" lineHeight={38}>
      Галузь освіти
    </TextTitle>
    <TextTitle fontSize={14} fontWeight="400" lineHeight={16} color="#91939F">
      Обери галузь освіти та спеціалізації, які тебе цікавлять, щоб спростити
      пошук ВНЗ.
    </TextTitle>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 30,
    paddingLeft: 16,
    paddingBottom: 8,
  },
});

export default HeaderEducation;
