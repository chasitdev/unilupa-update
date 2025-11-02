import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import TextTitle from '../../ui/Text/TextCustom';
import {PickerItem} from 'src/types/filter.type';
import {filterStyles} from '@utils/filterStyle';
import LocationModalSelection from '../Auth/LocationModalSelection';

interface Props {
  initialValue: string[];
  onChange: (value: any) => void;
  title?: string;
  items: PickerItem[];
  zIndex: number;
}

const StyledMultiplyPickerLocation = forwardRef<unknown, Props>(
  (props, ref) => {
    const [open, setOpen] = useState(false);
    const [items, setItems] = useState<PickerItem[]>([]);
    const [values, setValues] = useState<string[]>(props.initialValue);

    useImperativeHandle(ref, () => ({
      clearValues: () => {
        setValues([]);
      },
    }));

    useEffect(() => {
      props.onChange(values);
    }, [values]);

    useEffect(() => {
      if (props.items) {
        setItems(props.items);
      }
    }, [props.items]);

    const getNames = (values: string[]): string => {
      return items
        .filter(item => values.includes(item.value || ''))
        .map(item => item.label)
        .join(',\n');
    };

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

        <TouchableOpacity
          onPress={() => {
            setOpen(true);
          }}
          activeOpacity={0.8}
          style={styles.picker}>
          <TextTitle fontSize={14} lineHeight={18} style={styles.text}>
            {getNames(values) || 'Виберіть значення'}
          </TextTitle>
        </TouchableOpacity>

        <LocationModalSelection
          open={open}
          onClose={() => {
            setOpen(false);
          }}
          values={values}
          onChange={(values: string[]) => {
            setValues(values);
          }}
        />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'column',
    gap: 8,
  },
  dropdown: {},
  picker: {
    backgroundColor: '#202026',
    borderColor: '#3D3B3E',
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderRadius: 8,
  },
  dropDownContainer: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderColor: '#3D3B3E',
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

export default StyledMultiplyPickerLocation;
