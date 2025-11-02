import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles/sex-news.style.ts';
import {IPropsSexNews} from './types/sex-news.types.ts';
import DropDownPicker from 'react-native-dropdown-picker';
import {filterSex} from 'src/types/filter.type.ts';

const SexNews: React.FC<IPropsSexNews> = ({
  title,
  onChangeFilter,
  filter,
}: IPropsSexNews) => {
  const [selectedValue, setSelectedValue] = React.useState<filterSex>(
    filter.sex || 'A',
  );
  const [open, setOpen] = useState(false);
  const onChangeGender = (text: filterSex) => {
    setSelectedValue(text);
    onChangeFilter({
      ...filter,
      sex: text,
    });
  };
  React.useEffect(() => {
    if (filter.sex === 'A') {
      setSelectedValue(filter.sex);
      return;
    }
  }, [filter.sex]);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <DropDownPicker
          open={open}
          setOpen={setOpen}
          value={selectedValue}
          setValue={(text: any) => onChangeGender(text())}
          items={[
            {label: 'Auto', value: 'A'},
            {label: 'Жіноча', value: 'F'},
            {label: 'Чоловіча', value: 'M'},
          ]}
          placeholder="Виберіть стать"
          placeholderStyle={{color: '#B0B0B0'}}
          style={styles.picker}
          dropDownContainerStyle={styles.dropdownContainer}
        />
        <Text style={styles.result}>{selectedValue}</Text>
      </View>
    </View>
  );
};

export default SexNews;
