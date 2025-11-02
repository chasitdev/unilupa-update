import React from 'react';
import {ScrollView, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {IFilterItem, IFilterList} from './interface/filterListInterface';

export const FilterList: React.FC<IFilterList> = ({...props}: IFilterList) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}>
      {props.filters.map((f: IFilterItem, index: number) => (
        <TouchableOpacity
          key={index}
          style={{
            ...styles.filterBtn,
            ...(f.isActive ? styles.filterBtnActive : {}),
          }}
          onPress={() => props.handleFilter(f.id)}>
          <Text style={styles.filterText}>{f.name}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
  },
  filterBtn: {
    backgroundColor: '#202026',
    padding: 16,
    marginRight: 10,
    borderRadius: 8,
  },
  filterBtnActive: {
    backgroundColor: '#0E46F1',
  },
  filterText: {
    color: '#ffffff',
    fontSize: 14,
  },
});
