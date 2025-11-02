import SaveButton from '../../ui/ScreenView/Location Settings Screen/SaveButton';
import HeaderTextLocationScreen from '../../ui/ScreenView/LocationScreen/HeaderText';
import RegionButton from '../../ui/ScreenView/LocationScreen/RegionButton';
import {CityType} from 'src/types/city.enum';
import React from 'react';
import {Modal, SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

const regions: CityType[] = [
  CityType.KYIV,
  CityType.LVIVSKA,
  CityType.VINNYTSKA,
  CityType.VOLYNSKA,
  CityType.DNIPROPETROVSKA,
  CityType.RIVNENSKA,
  CityType.MYKOLAIVSKA,
  CityType.DONETSKA,
  CityType.ODESSKA,
  CityType.ZHYTOMYRSKA,
  CityType.ZAKARPATSKA,
  CityType.ZAPORIZKA,
  CityType.IVANOFRANKIVSKA,
  CityType.KYIVSKA,
  CityType.KIROVOHRADSKA,
  CityType.LUHANSKA,
  CityType.POLTAVSKA,
  CityType.SUMSKA,
  CityType.TERNOPILSKA,
  CityType.KHARKIVSKA,
  CityType.CHERKASKA,
  CityType.KHERSONSKA,
  CityType.KHMELNYTSKA,
  CityType.CHERNIVETSKA,
  CityType.CHERNIGIVSKA,
];

interface Props {
  open: boolean;
  values: string[];
  onChange: (values: string[]) => void;
  onClose: () => void;
}

const LocationModalSelection: React.FC<Props> = props => {
  return (
    <Modal visible={props.open} style={styles.container} animationType="fade">
      <View style={styles.container}>
        <SafeAreaView>
          <View style={styles.regions}>
            <HeaderTextLocationScreen />
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={styles.buttonContainer}>
              {regions.map(region => (
                <RegionButton
                  key={region}
                  title={region}
                  onPress={() => {
                    if (props.values.includes(region)) {
                      props.onChange(
                        props.values.filter(item => item !== region),
                      );
                      return;
                    }

                    props.onChange([...props.values, region]);
                  }}
                  isSelected={props.values.includes(region)}
                />
              ))}
            </ScrollView>
            <View style={styles.buttons}>
              <SaveButton title="Вибрати" onPress={props.onClose} />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'black',
    paddingHorizontal: 16,
  },
  scrollView: {
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
  },
  buttons: {
    alignItems: 'center',
    gap: 25,
    marginBottom: 10,
  },
  regions: {
    gap: 20,
    marginTop: 10,
  },
  settingsButton: {
    width: 48,
    height: 48,
    backgroundColor: '#0E46F1',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default LocationModalSelection;
