import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import TextCustom from 'src/ui/Text/TextCustom';

interface Props {
  values: number[];
  onChangeValues: (values: number[]) => void;
  title: string;
  minValue: number;
  maxValue: number;
  step: number;
  valueType: string;
}
const {width} = Dimensions.get('window');

const RangeSlider: React.FC<Props> = props => {
  const CustomMarker = () => <View style={styles.customMarker} />;

  return (
    <View>
      <View>
        <TextCustom
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          color="white">
          {props.title}
        </TextCustom>
      </View>

      <View style={styles.price}>
        <MultiSlider
          sliderLength={width - 72}
          values={props.values}
          onValuesChange={props.onChangeValues}
          min={props.minValue}
          max={props.maxValue}
          step={props.step}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={10}
          trackStyle={styles.track}
          selectedStyle={styles.selectedTrack}
          containerStyle={styles.sliderContainer}
          customMarker={CustomMarker}
        />

        <View style={styles.values}>
          <Text
            style={
              styles.valueText
            }>{`${props.values[0]} ${props.valueType}`}</Text>
          <Text
            style={
              styles.valueText
            }>{`${props.values[1]} ${props.valueType}`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    flex: 1,
    alignSelf: 'center',
  },
  track: {
    width: '100%',
    height: 4,
    backgroundColor: '#3D3B3E',
  },

  selectedTrack: {
    backgroundColor: '#0E46F1',
  },
  values: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  valueText: {
    color: '#91939F',
  },
  price: {
    width: '100%',
    alignSelf: 'center',
  },
  customMarker: {
    height: 28,
    width: 28,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
});

export default RangeSlider;
