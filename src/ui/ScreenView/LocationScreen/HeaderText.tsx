import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const HeaderTextLocationScreen = () => (
  <View style={styles.headerContainer}>
    <TextTitle fontSize={32} fontWeight="600" lineHeight={38}>
      Геолокація ВНЗ
    </TextTitle>
    <TextTitle fontSize={14} fontWeight="400" lineHeight={16} color="#91939F">
      Обери область чи місто, в якому ти б хотів(ла) навчатися.
    </TextTitle>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'flex-start',
    width: '100%',
  },
});

export default HeaderTextLocationScreen;
