import React from 'react';
import {Dimensions, Image, StyleSheet, TouchableOpacity, View} from 'react-native';

import {IRecommendationSlider} from './interfaces/university.interface';
import TextTitle from '../../Text/TextCustom';
import {icon} from 'src/assets/icons';
import {previewText} from '@utils/previewText';

interface Props {
  slide: IRecommendationSlider;
  onPress: () => void;
}



const Slides: React.FC<Props> = props => {
  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={1}>
      <View style={styles.slideContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={
              props.slide.previewImageUrl || props.slide.logo
                ? {
                    uri: props.slide.previewImageUrl || props.slide.logo,
                  }
                : icon.defaultUniversityImage
            }
            style={styles.logo}
          />
        </View>
        <View style={styles.textContainer}>
          <TextTitle fontSize={16} fontWeight="500">
            {previewText(props.slide.fullName || props.slide.shortName, 70)}
          </TextTitle>
          <TextTitle fontSize={16} fontWeight="300" color="#91939F">
            {props.slide.city || props.slide.adress}
          </TextTitle>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slideContainer: {
    borderRadius: 8,
    overflow: 'hidden',
    height: 300,
    width: Dimensions.get('window').width - 16,
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
    fontWeight: '500',
    lineHeight: 19,
    color: 'white',
  },
  cityText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 19,
    color: '#91939F',
  },
});

export default Slides;
