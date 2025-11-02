import React, {useState} from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import TextTitle from '../../Text/TextCustom';

interface Props {
  imagesUrl: string[];
  title?: string;
  isHostel?: boolean;
}

const UniversityImageGallery: React.FC<Props> = props => {
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!props.imagesUrl || props.imagesUrl.length === 0) {
    return null;
  }

  const numberOfImagesToShow = Math.min(4, props.imagesUrl.length);

  const openImageViewer = (index: number) => {
    setCurrentIndex(index);
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      {(!props.isHostel || !props.title) && (
        <TextTitle
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          style={styles.title}>
          {props.title}
        </TextTitle>
      )}
      <View style={[styles.gallery]}>
        {props.imagesUrl
          .slice(0, numberOfImagesToShow - (props.imagesUrl.length > 4 ? 1 : 0))
          .map((url, index) => (
            <TouchableOpacity
              key={url}
              onPress={() => openImageViewer(index)}
              style={[styles.logo, styles.imageWrapper]}>
              <Image
                source={{uri: url}}
                style={[StyleSheet.absoluteFillObject, styles.noImage]}
              />
            </TouchableOpacity>
          ))}

        {props.imagesUrl.length < 4 &&
          [...Array(4 - props.imagesUrl.length)].map((_, index) => (
            <View key={index} style={[styles.logo, styles.imageWrapper]} />
          ))}

        {props.imagesUrl.length > 4 && (
          <TouchableOpacity
            onPress={() => openImageViewer(3)}
            style={styles.logo}>
            <Image
              style={StyleSheet.absoluteFillObject}
              source={{uri: props.imagesUrl[3]}}
            />

            <View
              style={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backgroundColor: '#000000A5',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <TextTitle style={styles.plusText}>{`+${
                props.imagesUrl.length - 4
              }`}</TextTitle>
            </View>
          </TouchableOpacity>
        )}
      </View>

      <ImageView
        images={props.imagesUrl.map(url => ({uri: url}))}
        imageIndex={currentIndex}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
  title: {
    color: 'white',
    marginBottom: 15,
  },
  gallery: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
  },
  imageWrapper: {
    marginHorizontal: '1.5%',
  },
  logo: {
    width: '22%',
    aspectRatio: 1,
    borderRadius: 8,
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3D3B3E',
  },
  logoWithText: {
    flex: 1,
    position: 'relative',
  },
  plusText: {
    color: '#FFFFFF',
    fontSize: 24,
  },
  noImage: {
    backgroundColor: 'black',
  },
});

export default UniversityImageGallery;
