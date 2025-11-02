import React, {useCallback, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import CustomButtonMainScreen from './Buttons';
import {ScrollView} from 'react-native-gesture-handler';

interface IProps {
  value: string;
  onChange: (type: string) => void;
}

const ButtonsBar: React.FC<IProps> = props => {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={{
        display: 'flex',
        flexDirection: 'row',
        gap: 12,
        paddingLeft: 16,
      }}
      showsHorizontalScrollIndicator={false}>
      <CustomButtonMainScreen
        title={'Всі'}
        onPress={() => {
          props.onChange('Всі');
        }}
        isSelected={props.value === 'Всі'}
      />
      <CustomButtonMainScreen
        title={'Університети'}
        onPress={() => {
          props.onChange('Університет');
        }}
        isSelected={props.value === 'Університет'}
      />
      <CustomButtonMainScreen
        title={'Інститути'}
        onPress={() => {
          props.onChange('Інститут');
        }}
        isSelected={props.value === 'Інститут'}
      />
      <CustomButtonMainScreen
        title={'Академії'}
        onPress={() => {
          props.onChange('Академія');
        }}
        isSelected={props.value === 'Академія'}
      />
      <CustomButtonMainScreen
        title={'Коледжі'}
        onPress={() => {
          props.onChange('Коледж');
        }}
        isSelected={props.value === 'Коледж'}
      />
      <CustomButtonMainScreen
        title={'Училища'}
        onPress={() => {
          props.onChange('Училище');
        }}
        isSelected={props.value === 'Училище'}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ButtonsBar;
