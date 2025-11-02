import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

interface IProps {
  title: string;
  items: {
    _id: string;
    name: string;
  }[];
  onPress: (id: string) => void;
  selectItem: string[];
}

const DropdownSection: React.FC<IProps> = ({
  title,
  items,
  onPress,
  selectItem,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.section}>
      <TouchableOpacity
        onPress={() => setExpanded(!expanded)}
        style={styles.header}>
        <Text style={styles.headerText}>{title}</Text>
        <Text style={styles.arrow}>{expanded ? '▲' : '▼'}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdown}>
          {items.map(
            (
              item: {
                _id: string;
                name: string;
              },
              index: number,
            ) => (
              <TouchableOpacity
                key={index}
                style={
                  selectItem.includes(item._id)
                    ? styles.selectItem
                    : styles.item
                }
                onPress={() => onPress(item._id)}>
                <Text style={styles.headerText}>{item.name}</Text>
              </TouchableOpacity>
            ),
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  arrow: {
    color: '#fff', // белый цвет
    fontSize: 16,
    marginLeft: 10,
  },
  section: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3D3B3E',
    borderRadius: 8,
    overflow: 'hidden',
    width: '100%',
  },
  header: {
    padding: 15,
    backgroundColor: '#202026',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  dropdown: {
    // backgroundColor: '#fff',
    paddingVertical: 10,
    backgroundColor: '#202026',
  },
  item: {
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 7,
    borderColor: '#8F8F92',
  },
  selectItem: {
    backgroundColor: '#0E46F1',

    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    display: 'flex',
    alignItems: 'center',
    borderWidth: 1,
    margin: 10,
    borderRadius: 7,
    borderColor: '#8F8F92',
  },
});

export default DropdownSection;
