import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const DropdownSpeciality = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [specialityItems, setSpecialityItems] = useState([
    {label: 'Освіта', value: 'costMin'},
    {label: 'Освіта1', value: 'costMax'},
  ]);

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={specialityItems}
        setOpen={setOpen}
        setValue={setSpecialityItems}
        setItems={() => {}}
        placeholder="Освіта"
        containerStyle={styles.dropdown}
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.text}
        theme="DARK"
        arrowIconStyle={styles.arrowStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },
  dropdown: {
    width: '95%',
    marginHorizontal: 12,
  },
  picker: {
    backgroundColor: '#202026',
    borderColor: '#3D3B3E',
    width: '100%',
  },
  dropDownContainer: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderColor: '#3D3B3E',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    color: 'white',
    marginLeft: 5,
  },
  icon: {
    color: 'white',
  },
  arrowStyle: {
    left: 8,
  },
});

export default DropdownSpeciality;
