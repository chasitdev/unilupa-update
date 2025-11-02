import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import BackgroundGradient from '../Gradients/BackgroundGradient.tsx';
import TextCustom from '../Text/TextCustom.tsx';
import {styles} from './styles/button.color.biggest.style';
import Offset from '../Offset/Offset.tsx';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TextStyle,
  View,
} from 'react-native';

interface IProps {
  onPress: () => void;
  gradient: string[];
  directionGradient: 'to-right' | 'to-left' | 'to-up' | 'to-bottom';
  sourceImage?: ImageSourcePropType;
  title: string;
  desc?: string;
  styleTitle?: StyleProp<TextStyle>;
}

const ButtonColorBiggest: React.FC<IProps> = ({
  onPress,
  gradient,
  directionGradient,
  sourceImage,
  styleTitle,
  title,
  desc,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.containerBtn}>
      <View style={styles.btnBiggest}>
        <BackgroundGradient
          directionGradient={directionGradient}
          gradient={gradient}
        />
        <Offset mt={!!!sourceImage ? 0 : 14} />
        {/* icon */}
        {sourceImage && (
          <Image source={sourceImage} alt="cap" style={styles.iconBiggestBtn} />
        )}
        <Offset mt={3} />
      </View>
      {/* title */}
      <TextCustom style={[styleTitle]}>{title}</TextCustom>
    </TouchableOpacity>
  );
};

export default ButtonColorBiggest;
