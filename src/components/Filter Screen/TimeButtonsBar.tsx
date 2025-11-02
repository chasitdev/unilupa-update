import {FilterInterface} from 'src/types/filter.type';
import React from 'react';
import {StyleSheet} from 'react-native';
import CustomTimeButton from './TimeButton';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  filter: FilterInterface;
  setFilter: (filter: FilterInterface) => void;
}

const TimeButtonsBar: React.FC<Props> = ({filter, setFilter}) => {
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
        onPress={() => setFilter({...filter, studyMode: 'всі'})}
        isSelected={filter.studyMode === 'всі'}
      />
      <CustomTimeButton
        title={'Денна'}
        onPress={() => setFilter({...filter, studyMode: 'денна'})}
        isSelected={filter.studyMode === 'денна'}
      />
      <CustomTimeButton
        title={'Вечірня'}
        onPress={() => setFilter({...filter, studyMode: 'вечірня'})}
        isSelected={filter.studyMode === 'вечірня'}
      />
      <CustomTimeButton
        title={'Дистанційна'}
        onPress={() => setFilter({...filter, studyMode: 'дистанційна'})}
        isSelected={filter.studyMode === 'дистанційна'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
});

export default TimeButtonsBar;
