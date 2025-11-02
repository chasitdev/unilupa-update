import {icon} from 'src/assets/icons';
import {previewText} from '@utils/previewText';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

interface Props {
  previewImage: string;
  name: string;
  city: string;
}
const DetailHeaderImage: React.FC<Props> = props => {
  return (
    <View style={styles.slideContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={
            props.previewImage
              ? {uri: props.previewImage}
              : icon.defaultUniversityImage
          }
          style={styles.logo}
        />
      </View>
      <View style={styles.textContainer}>
        {/* <Text style={styles.text}>{slide.fullName}</Text>
        <Text style={styles.cityText}>{slide.city || 'Місто'}</Text> */}
        <Text style={styles.text}>{previewText(props.name, 120)}</Text>
        <Text style={styles.cityText}>{props.city}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    borderRadius: 8,
    backgroundColor: '#202026',
    overflow: 'hidden',
    height: 320,
    width: '95%',
    alignSelf: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  logo: {
    width: '100%',
    height: '100%',
  },
  textContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: '#202026',
    paddingHorizontal: 10,
    gap: 5,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '400',
    color: 'white',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#91939F',
  },
});

export default DetailHeaderImage;
