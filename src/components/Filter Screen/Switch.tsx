import React from 'react';
import {StyleSheet, Switch, View} from 'react-native';
import TextTitle from '../ui/TextTitle';

interface Props {
  title: string;
  isEnabled: boolean;
  onChange: () => void;
}

const ToggleSwitch: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      <Switch
        trackColor={{false: '#787880', true: '#0E46F1'}}
        thumbColor="white"
        ios_backgroundColor="#3e3e3e"
        onValueChange={props.onChange}
        value={props.isEnabled}
      />

      {props.title && (
        <TextTitle
          color="#91939F"
          fontSize={14}
          fontWeight="400"
          lineHeight={16}>
          {props.title}
        </TextTitle>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    color: '#91939F',
    marginLeft: 10,
  },
  detailsContainer: {
    flexDirection: 'column',
    marginLeft: 10,
  },
});

export default ToggleSwitch;
