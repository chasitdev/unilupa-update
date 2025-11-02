import CollapsibleSection from '../Education Screen/CollapsibleCollection';
import EducationOptionButton from '../Education Screen/EducationOptionButton';
import HeaderEducation from '../Education Screen/HeaderEducation';
import SaveButton from '../../ui/ScreenView/Location Settings Screen/SaveButton';
import {specialities} from 'src/types/specialties';
import {countMatches} from '@utils/countMatches';
import React from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

interface Props {
  open: boolean;
  values: string[];
  onChange: (values: string[]) => void;
  onClose: () => void;
}

const SpecialityModalSelection: React.FC<Props> = props => {
  return (
    <Modal visible={props.open} style={styles.container} animationType="fade">
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <View style={styles.container}>
            <HeaderEducation />
            <ScrollView
              style={styles.scrollView}
              contentContainerStyle={{paddingBottom: 30}}>
              {specialities.map(section => {
                const count = countMatches(
                  section.specialties.map(s => s.code),
                  props.values,
                );

                return (
                  <CollapsibleSection
                    key={section.code}
                    title={`${section.name} ${count > 0 ? `(${count})` : ''}`}>
                    {section.specialties.map(s => (
                      <EducationOptionButton
                        key={s.code}
                        title={`${s.name} (${s.code})`}
                        onPress={() => {
                          if (props.values.includes(s.code)) {
                            props.onChange(
                              props.values.filter(spec => spec != s.code),
                            );
                            return;
                          }

                          props.onChange([...props.values, s.code]);
                        }}
                        isSelected={props.values.includes(s.code)}
                      />
                    ))}
                  </CollapsibleSection>
                );
              })}
            </ScrollView>
            <View style={styles.bottomButtons}>
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
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  scrollView: {
    width: '100%',
    padding: 16,
  },
  buttons: {
    marginTop: 14,
    width: '100%',
    alignItems: 'center',
  },
  bottomButtons: {
    padding: 15,
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    left: 5,
  },
  settingsButton: {
    alignSelf: 'flex-start',
    width: 48,
    height: 48,
    marginLeft: 16,
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

export default SpecialityModalSelection;
