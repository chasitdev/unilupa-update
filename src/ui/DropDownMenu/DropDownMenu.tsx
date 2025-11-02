
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextTitle from '../Text/TextCustom';

interface Props {
  keyObj: string;
  data: any;
  onChange: (keyObj: string, text: string)=>void;
  placeholder: string;
  listData:{
    label: string;
    value: string;
  }[]
}

const DropDownMenu: React.FC<Props> = ({
  keyObj,
  data,
  onChange,
  listData,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | null>(null);

  const [items, setItems] = useState<{
    label: string;
    value: string;
  }[]>(listData);

  // useEffect(()=>{
  //   if(listData.length){
  //     setItems(listData);
  //   }
  // },[listData])

  const handleChange = (value: string | null) => {
    const text: string = value === null? '' : value
    setValue(value);
    onChange(keyObj, text);
  };

  return (
        <View style={styles.container}>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={placeholder}
            containerStyle={styles.dropdown}
            style={styles.picker}
            dropDownContainerStyle={
              open ? styles.dropDownContainerOpen : styles.dropDownContainer
            }
            textStyle={styles.text}
            theme="DARK"
            onChangeValue={handleChange}
          />
        </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    zIndex:99999,    
  },
  dropdown: {
    width: '95%',
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
    // lineHeight: 16,
    color: 'white',
    marginRight: -21,
  },
});

export default DropDownMenu;
