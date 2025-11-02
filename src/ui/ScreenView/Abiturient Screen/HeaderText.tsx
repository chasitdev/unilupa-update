import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const HeaderTextAbiturientScreen = () => (
  <View style={styles.headerContainer}>
    <TextTitle fontSize={32} fontWeight="600" lineHeight={38}>
      Абітурієнт
    </TextTitle>
    <TextTitle fontSize={14} fontWeight="400" lineHeight={16} color="#91939F">
      Обери себе в списку, щоб активувати трекер відслідковування даних.
    </TextTitle>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
    bottom: 15,
  },
});

export default HeaderTextAbiturientScreen;
