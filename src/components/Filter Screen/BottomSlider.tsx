import MultiSlider from '@ptomasroos/react-native-multi-slider';
import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import TextCustom from 'src/ui/Text/TextCustom';

interface Props {
  onChangePercent: (values: number[]) => void;
  onChangeHostel: (values: number[]) => void;
}

const BottomSlider: React.FC<Props> = ({onChangePercent, onChangeHostel}) => {
  const [percent, setPercent] = useState([10, 100]);
  const [hostel, setHostel] = useState([10, 100]);

  const handlePercentChange = (newValues: number[]) => {
    setPercent(newValues);
    onChangePercent(newValues);
  };

  const handleHostelChange = (newValues: number[]) => {
    setHostel(newValues);
    onChangeHostel(newValues);
  };

  return (
    <View>
      <View style={styles.container}>
        <TextCustom
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          color="white">
          Відсоток бюджетних місць:
        </TextCustom>
      </View>
      <View style={styles.price}>
        <MultiSlider
          values={[percent[0], percent[1]]}
          sliderLength={300}
          onValuesChange={handlePercentChange}
          min={10}
          max={100}
          step={10}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={10}
          trackStyle={styles.track}
          selectedStyle={styles.selectedTrack}
        />
        <View style={styles.values}>
          <Text style={styles.valueText}>{`${percent[0]}%`}</Text>
          <Text style={styles.valueText}>{`${percent[1]}%`}</Text>
        </View>
      </View>
      <View style={styles.container}>
        <TextCustom
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          color="white">
          Вартість гуртожитку / місяць:
        </TextCustom>
      </View>
      <View style={styles.price}>
        <MultiSlider
          values={[hostel[0], hostel[1]]}
          sliderLength={300}
          onValuesChange={handleHostelChange}
          min={10}
          max={100}
          step={10}
          allowOverlap={false}
          snapped
          minMarkerOverlapDistance={10}
          trackStyle={styles.track}
          selectedStyle={styles.selectedTrack}
        />
        <View style={styles.values}>
          <Text style={styles.valueText}>{`${hostel[0]} грн`}</Text>
          <Text style={styles.valueText}>{`${hostel[1]} грн`}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'black',
    alignSelf: 'flex-start',
    marginLeft: 16,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  track: {
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
    alignSelf: 'center',
  },
});

export default BottomSlider;
