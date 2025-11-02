import React, {useRef, useState} from 'react';
import {Modal, SafeAreaView, ScrollView, View} from 'react-native';

import TextCustom from '../../../ui/Text/TextCustom.tsx';
import {
  defaultFilter,
  FilterInterface,
  locationPickerItems,
} from 'src/types/filter.type.ts';
import {specialtiesItems} from 'src/types/specialties.ts';
import {styles} from './styles/filter.styles.ts';
import TopBarFilterScreen from 'src/components/Filter Screen/TopBarFilterScreen.tsx';
import StyledMultiplyPickerLocation from 'src/components/Picker/StyledMultiplyPickerLocation.tsx';
import StyledMultiplyPickerSpecialty from 'src/components/Picker/StyledMultiplyPickerSpecialty.tsx';
import RangeSlider from 'src/components/Filter Screen/PriceSlider.tsx';
import EducationButtonsBar from 'src/components/Filter Screen/EducationButtonsBar.tsx';
import TimeButtonsBar from 'src/components/Filter Screen/TimeButtonsBar.tsx';
import ContractButtonsBar from 'src/components/Filter Screen/ContractButtonsBar.tsx';
import FindButton from 'src/components/Filter Screen/FindButton.tsx';

interface Props {
  open: boolean;
  onClose: () => void;
  applyFilter: (filter: FilterInterface) => void;
}

interface IRef extends HTMLElement {
  clearValues: () => void;
}

const FilterUniversityModalScreen: React.FC<Props> = props => {
  const [filter, setFilter] = useState<FilterInterface>(defaultFilter);
  const locationRef = useRef<IRef | null>(null);
  const specialityRef = useRef<IRef | null>(null);

  const resetFilters = () => {
    setFilter({...defaultFilter, speciality: [], locations: []});
    console.log('reset');
    console.log(filter);
    locationRef && locationRef?.current?.clearValues();
    specialityRef?.current?.clearValues();
  };

  return (
    <Modal visible={props.open} style={styles.container} animationType="fade">
      <SafeAreaView style={{backgroundColor: 'black', flex: 1}}>
        <ScrollView contentContainerStyle={{paddingBottom: 50}}>
          <View style={styles.top}>
            <TopBarFilterScreen
              onBackPress={props.onClose}
              onResetFilters={resetFilters}
              title={'Фільтр'}
            />
          </View>
          <View style={styles.zIndex}>
            <StyledMultiplyPickerLocation
              onChange={(v: string[]) => {
                setFilter({
                  ...filter,
                  locations: [...v],
                });
              }}
              initialValue={filter.locations}
              items={locationPickerItems}
              title={'Геолокація ВНЗ:'}
              zIndex={2}
              ref={locationRef}
            />

            <StyledMultiplyPickerSpecialty
              onChange={(v: string[]) => {
                setFilter({
                  ...filter,
                  speciality: [...v],
                });
              }}
              initialValue={filter.speciality}
              items={specialtiesItems}
              title={'Спеціальність:'}
              zIndex={2}
              ref={specialityRef}
            />
          </View>

          <View style={styles.screen}>
            <RangeSlider
              values={filter.priceRange}
              onChangeValues={values =>
                setFilter({...filter, priceRange: values})
              }
              title="Вартість навчання / рік"
              minValue={0}
              maxValue={400000}
              step={1000}
              valueType="грн"
            />
          </View>
          <View>
            <View>
              <View style={styles.sortText}>
                <TextCustom
                  fontSize={20}
                  fontWeight="600"
                  lineHeight={24}
                  color="white">
                  Освітній ступінь:
                </TextCustom>
              </View>
              <EducationButtonsBar filter={filter} setFilter={setFilter} />
            </View>
            <View>
              <View style={styles.sortText}>
                <TextCustom
                  fontSize={20}
                  fontWeight="600"
                  lineHeight={24}
                  color="white">
                  Форма навчання:
                </TextCustom>
              </View>
              <TimeButtonsBar filter={filter} setFilter={setFilter} />
            </View>
            <View>
              <View style={styles.sortText}>
                <TextCustom
                  fontSize={20}
                  fontWeight="600"
                  lineHeight={24}
                  color="white">
                  Наявність бюджетних місць:
                </TextCustom>
              </View>
              <ContractButtonsBar filter={filter} setFilter={setFilter} />
            </View>
          </View>
        </ScrollView>

        <View
          style={{
            position: 'absolute',
            bottom: 30,
            width: '100%',
            backgroundColor: 'black',
          }}>
          <FindButton
            onPress={() => {
              props.applyFilter(filter);
              props.onClose();
            }}
          />
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default FilterUniversityModalScreen;
