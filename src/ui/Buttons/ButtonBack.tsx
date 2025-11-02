import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {styles} from './styles/button.back.style';
import {icon} from 'src/assets/icons';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from 'src/navigation/types/navigation.type';
import TextCustom from '../Text/TextCustom';
import {color} from 'src/utils/colors';

type NavigationProps = StackNavigationProp<RootStackParamList>;
interface IProps {
  text?: string;
  onPress?: () => void;
}

const ButtonBack: React.FC<IProps> = ({text, onPress}) => {
  const navigation = useNavigation<NavigationProps>();
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        if (onPress) {
          return onPress();
        }
        navigation.goBack();
      }}>
      <Image source={icon.backIcon} style={styles.icon} />
      {!!text && (
        <TextCustom
          color={color.buttonDark}
          fontWeight="600"
          fontSize={16}
          lineHeight={24}>
          {text}
        </TextCustom>
      )}
    </TouchableOpacity>
  );
};

export default ButtonBack;
