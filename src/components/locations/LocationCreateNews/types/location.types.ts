import {ImageSourcePropType} from 'react-native';

export interface IPropsLocationCreateNews {
  title: string;
  onChange: (v: string) => void;
  setIsOpenDropdown: (s: boolean) => void;
  iconLeftText?: ImageSourcePropType;
  errors?: object;
}
