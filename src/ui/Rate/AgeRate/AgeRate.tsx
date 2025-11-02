import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {styles} from './styles/age-rate.style.ts';
import {IPropsAgeRate} from './types/age-rate.ts';

const AgeRate: React.FC<IPropsAgeRate> = ({
  title,
  onChangeFilter,
  filter,
}: IPropsAgeRate) => {
  const [minAgeValue, setMinAgeValue] = React.useState(filter.min_age ?? '');
  const [maxAgeValue, setMaxAgeValue] = React.useState(filter.max_age ?? '');

  const onChangeAgeFrom = (text: string) => {
    setMinAgeValue(text);
    onChangeFilter({
      ...filter,
      min_age: +text,
    });
  };
  const onChangeAgeTo = (text: string) => {
    setMaxAgeValue(text);
    onChangeFilter({
      ...filter,
      max_age: +text,
    });
  };

  React.useEffect(() => {
    if (filter.min_age === null) {
      setMinAgeValue('');
      onChangeFilter({
        ...filter,
        min_age: null,
      });
    }
    if (filter.max_age === null) {
      setMaxAgeValue('');
      onChangeFilter({
        ...filter,
        max_age: null,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter.min_age, filter.max_age]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{title}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={minAgeValue.toString()}
          placeholder="Введіть вік с"
          keyboardType="numeric"
          inputMode="numeric"
          onChangeText={text => {
            onChangeAgeFrom(text);
          }}
        />
        <TextInput
          style={styles.input}
          value={maxAgeValue.toString()}
          placeholder="Введіть вік до"
          keyboardType="numeric"
          inputMode="numeric"
          onChangeText={text => {
            onChangeAgeTo(text);
          }}
        />
      </View>
    </View>
  );
};

export default AgeRate;
