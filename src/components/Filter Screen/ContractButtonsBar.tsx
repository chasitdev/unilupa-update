import {FilterInterface} from 'src/types/filter.type';
import React from 'react';
import {StyleSheet} from 'react-native';
import ContractButton from './ContractButton';
import {ScrollView} from 'react-native-gesture-handler';

interface Props {
  filter: FilterInterface;
  setFilter: (filter: FilterInterface) => void;
}

const ContractButtonsBar: React.FC<Props> = ({filter, setFilter}) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentcontainer}
      horizontal>
      <ContractButton
        title={'Всі'}
        onPress={() => setFilter({...filter, budgetPlacesAvailable: 'Всі'})}
        isSelected={filter.budgetPlacesAvailable === 'Всі'}
      />
      <ContractButton
        title={'Так'}
        onPress={() => setFilter({...filter, budgetPlacesAvailable: 'Так'})}
        isSelected={filter.budgetPlacesAvailable === 'Так'}
      />
      <ContractButton
        title={'Ні'}
        onPress={() => setFilter({...filter, budgetPlacesAvailable: 'Ні'})}
        isSelected={filter.budgetPlacesAvailable === 'Ні'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
  },
  contentcontainer: {gap: 10},
  sortText: {
    marginTop: 15,
  },
});

export default ContractButtonsBar;
