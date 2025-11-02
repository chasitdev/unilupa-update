import {FilterInterface} from 'src/types/filter.type';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CustomTimeButton from './TimeButton';

interface Props {
  filter: FilterInterface;
  setFilter: (filter: FilterInterface) => void;
}

const EducationButtonsBar: React.FC<Props> = ({filter, setFilter}) => {
  return (
    <ScrollView
      style={{
        marginLeft: 16,
      }}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      horizontal>
      <CustomTimeButton
        title={'Всі'}
        onPress={() => setFilter({...filter, education: 'Всі'})}
        isSelected={filter.education === 'Всі'}
      />
      <CustomTimeButton
        title={'Бакалавр'}
        onPress={() => setFilter({...filter, education: 'Бакалавр'})}
        isSelected={filter.education === 'Бакалавр'}
      />
      <CustomTimeButton
        title={'Магістр'}
        onPress={() => setFilter({...filter, education: 'Магістр'})}
        isSelected={filter.education === 'Магістр'}
      />
      <CustomTimeButton
        title={'Фаховий молодший бакалавр'}
        onPress={() =>
          setFilter({...filter, education: 'Фаховий молодший бакалавр'})
        }
        isSelected={filter.education === 'Фаховий молодший бакалавр'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});

export default EducationButtonsBar;
