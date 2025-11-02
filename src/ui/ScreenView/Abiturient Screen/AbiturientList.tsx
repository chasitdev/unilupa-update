import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ListHeader from './ListHeader';
import ListItem from './ListItem';

const AbiturientList = ({data}) => (
  <>
    <ListHeader />
    <FlatList
      data={data}
      renderItem={({item, index}) => (
        <ListItem index={index + 1} name={item.name} score={item.score} />
      )}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
    />
  </>
);

const styles = StyleSheet.create({
  list: {
    gap: 5,
  },
  listItem: {
    backgroundColor: 'black',
    padding: 16,
    marginVertical: 4,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemText: {
    color: 'white',
  },
});

export default AbiturientList;
