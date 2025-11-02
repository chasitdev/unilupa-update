import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface IProps {
  index: number;
  name: string;
  score: string;
}

const ListItem: React.FC<IProps> = ({index, name, score}) => (
  <View style={styles.itemContainer}>
    <Text style={styles.index}>
      {index}
      {'\u00A0\u00A0\u00A0\u00A0\u00A0'}
    </Text>
    <Text style={styles.name}>{name}</Text>
    <Text style={styles.score}>{score}</Text>
  </View>
);

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 13,
    backgroundColor: '#202026',
    borderColor: '#3D3B3E',
    borderRadius: 8,
    marginVertical: 4,
    borderWidth: 1,
  },
  index: {
    color: 'white',
  },
  name: {
    color: 'white',
    marginLeft: 16,
    flex: 1,
  },
  score: {
    color: 'white',
  },
});

export default ListItem;
