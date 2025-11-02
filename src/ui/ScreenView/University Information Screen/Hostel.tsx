import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../../Text/TextCustom';
import UniversityImageGallery from './UniversityImageGallery';
import {icon} from 'src/assets/icons';

interface Props {
  imagesUrl: string[];
  name: string;
  price: number;
  address: string;
  onPress: () => void;
}

const Hostel: React.FC<Props> = props => {
  const hasImages = props.imagesUrl && props.imagesUrl.length > 0;

  return (
    <View style={[styles.component, !hasImages && styles.shortComponent]}>
      <View
        style={{
          paddingLeft: 10,
        }}>
        <TextTitle
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          style={styles.hostelName}>
          {props.name}
        </TextTitle>
      </View>

      <View
        style={{
          paddingLeft: 5,
        }}>
        {hasImages ? (
          <UniversityImageGallery
            imagesUrl={props.imagesUrl}
            title=""
            isHostel={true}
          />
        ) : null}
      </View>

      <View style={styles.addressContainer}>
        <TextTitle
          fontSize={14}
          fontWeight="400"
          lineHeight={16}
          color={'#91939F'}
          style={{flexWrap: 'wrap'}}>
          {props.address}
        </TextTitle>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.bottomRow}>
          <View style={styles.priceAndButtonContainer}>
            <TextTitle
              fontSize={20}
              fontWeight="600"
              lineHeight={24}
              style={styles.price}>
              {props.price ? `${props.price} грн/місяць` : 'Вартість невідома'}
            </TextTitle>
            <TouchableOpacity style={styles.button} onPress={props.onPress}>
              {/* <TextTitle fontSize={14} fontWeight="500" lineHeight={16}>
                Показати на карті
              </TextTitle> */}
              <Image
                source={icon.navigationIcon}
                style={{
                  tintColor: '#ffffff',
                  width: 14,
                  height: 14,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderRadius: 16,
    borderColor: '#3D3B3E',
    padding: 8,
    width: '100%',
    alignSelf: 'center',
    minHeight: 200,
    position: 'relative',
  },
  shortComponent: {
    minHeight: 86,
  },
  infoContainer: {
    // padding: 10,
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  hostelName: {
    width: '100%',
    marginBottom: 10,
  },
  addressContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
    width: '100%',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
    width: '100%',
    // alignItems: 'center',
  },
  priceAndButtonContainer: {
    marginTop: 10,
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#0E46F1',
    borderRadius: 350,
    justifyContent: 'center',
    alignItems: 'center',

    height: 36,
    width: 36,
  },
});

export default Hostel;
