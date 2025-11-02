import {icon} from 'src/assets/icons';
import React from 'react';
import {Image, StyleSheet} from 'react-native';

const MainImage = () => (
  <Image
    source={icon.mainImage}
    style={styles.illustration}
    resizeMode="contain"
  />
);

const styles = StyleSheet.create({
  illustration: {
    width: 300,
    height: 300,
  },
});

export default MainImage;
