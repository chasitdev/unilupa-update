import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

interface Props {
  onChange: (value: string) => void;
}

const DropdownComponent: React.FC<Props> = ({onChange}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);
  const [items, setItems] = useState([
    {label: 'Назвою А-Я', value: 'nameA'},
    {label: 'Назвою Я-А', value: 'nameZ'},
    {label: 'Зростанням ціни', value: 'costMin'},
    {label: 'Спаданням ціни', value: 'costMax'},
    {label: 'Рейтингом', value: 'rating'},
    {label: 'Відстанню ближче', value: 'distanceMin'},
    {label: 'Відстанню далі', value: 'distanceMax'},
  ]);
  const handleChange = (selectedValue: string) => {
    setValue(selectedValue);
    onChange(selectedValue);
  };

  return (
    <View style={styles.container}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        onChangeValue={handleChange}
        setItems={setItems}
        placeholder="Назвою А-Я"
        containerStyle={styles.dropdown}
        style={styles.picker}
        dropDownContainerStyle={
          open ? styles.dropDownContainerOpen : styles.dropDownContainer
        }
        textStyle={styles.text}
        theme="DARK"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  dropDownContainerOpen: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderColor: '#3D3B3E',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
    color: 'white',
    marginRight: -19,
  },
  icon: {
    color: 'white',
  },
  arrowStyle: {
    left: 8,
  },
});

export default DropdownComponent;
