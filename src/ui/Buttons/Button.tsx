import React from 'react';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Preloader from 'src/components/Preloader/Preloader';

interface IProps {
  title: string;
  onPress: () => void;
  stylesWrap: {};
  stylesText: {};
  preloader?: boolean;
}
const Button: React.FC<IProps> = ({
  title,
  onPress,
  stylesWrap = {},
  stylesText = {},
  preloader = false,
}) => {
  return (
    <TouchableOpacity
      style={[{flex: 1, flexDirection: 'row'}, stylesWrap]}
      onPress={onPress}>
      <TextInput style={[{...stylesText},{pointerEvents: 'none'}]}>{title}</TextInput>
      {preloader && <Preloader />}
    </TouchableOpacity>
  );
};
export default Button;
