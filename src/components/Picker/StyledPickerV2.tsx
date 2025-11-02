import React, {Dispatch, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextTitle from '../../ui/Text/TextCustom';
import {PickerItem} from 'src/types/filter.type';
import {filterStyles} from '@utils/filterStyle';

interface Props {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  items: PickerItem[];
  zIndex: number;
}

const StyledPickerV2: React.FC<Props> = props => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [items, setItems] = useState<PickerItem[]>([]);

  // useEffect(() => {
  //   props.onChange(value || 'Вся Україна');
  // }, [value]);

  useEffect(() => {
    if (props.items) {
      setItems(props.items);
    }
  }, [props.items]);

  return (
    <View
      style={[
        styles.container,
        filterStyles({
          zIndex: props.zIndex,
        }),
      ]}>
      {props.title && (
        <TextTitle
          fontSize={20}
          fontWeight="600"
          lineHeight={24}
          color="white">
          {props.title}
        </TextTitle>
      )}

      <DropDownPicker
        open={open}
        value={props.value}
        items={items}
        setItems={setItems}
        setOpen={setOpen}
        setValue={(s: any) => {
          setValue(s());
          props.onChange(s() || items[0].value);
        }}
        placeholder={props.items[0].label || 'Виберіть значення'}
        containerStyle={styles.dropdown}
        style={styles.picker}
        dropDownContainerStyle={styles.dropDownContainer}
        textStyle={styles.text}
        theme="DARK"
        listMode="MODAL"
        scrollViewProps={{
          nestedScrollEnabled: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  dropdown: {},
  picker: {
    backgroundColor: 'transparent',
    borderColor: '#FFFFFFFF',
    width: '100%',
    paddingHorizontal: 16,
  },
  dropDownContainer: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderColor: '#FFFFFFFF',
    maxHeight: 150,
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

export default StyledPickerV2;
