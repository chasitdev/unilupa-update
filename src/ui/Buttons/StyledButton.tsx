import {filterStyles} from '@utils/filterStyle';
import React from 'react';
import {
  ActivityIndicator,
  Image,
  ImagePropsBase,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {color} from '../../utils/colors';
import {spacing} from '../../utils/spacing';
import TextTitle from '../Text/TextCustom';

interface Props {
  title: string;
  iconSvg?: ImagePropsBase;
  iconLeftPng?: ImagePropsBase;
  iconLeftSvg?: ImagePropsBase;
  iconSize?: number;
  onPress?: () => void;
  gap?: number;
  borderColor?: string;
  borderWidth?: number;
  backgroundColor?: string;
  color?: string;
  isLoading?: boolean;
  disabled?: boolean;
  isFlex?: boolean;
  stretchDisable?: boolean;
  fontSIze?: number;
}
const StyledButton: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.isLoading) {
          return;
        }

        if (props.onPress) {
          props.onPress();
        }
      }}
      style={[
        styles.container,
        filterStyles({
          borderColor: props.borderColor,
          backgroundColor: props.backgroundColor,
          borderWidth: props.borderWidth,
        }),
        props.disabled ? styles.disabled : null,
        props.isFlex ? {flex: 1} : {},
        props.stretchDisable ? {width: undefined} : {},
      ]}>
      {props.iconLeftPng && (
        <Image
          style={{
            width: props.iconSize || 20,
            height: props.iconSize || 20,
          }}
          source={props.iconLeftPng}
        />
      )}

      {props.iconLeftSvg && (
        <Image
          width={props.iconSize || 20}
          height={props.iconSize || 20}
          source={props.iconLeftSvg}
        />
      )}

      {props.isLoading && <ActivityIndicator color={color.primary} />}

      {!props.isLoading && (
        <TextTitle
          color={
            props.disabled ? '#98A2B3' : props.color || color.buttonSecondary
          }
          fontWeight="600"
          fontSize={props.fontSIze || 16}
          lineHeight={24}>
          {props.title}
        </TextTitle>
      )}
      {props.iconSvg && (
        <Image
          width={props.iconSize || 20}
          height={props.iconSize || 20}
          source={props.iconSvg}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.white,
    width: '100%',
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: spacing.lg,
    display: 'flex',
    flexDirection: 'row',
    gap: spacing.sm,
    borderWidth: 1,
    borderColor: '#85D0B5',
  },
  disabled: {
    backgroundColor: '#EAECF0',
  },
  disabledText: {
    color: '#98A2B3',
  },
});

export default StyledButton;
