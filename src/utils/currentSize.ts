import {Dimensions} from 'react-native';

const defaultWidth = 430;
// const defaultHeight = 932;

export const getCurrentWidthSize = (size: number, screenWidth: number) =>
  (size / defaultWidth) * screenWidth;

export function getCurrentHeightSize(minHeight, maxHeight, baseScreenHeight) {
  const screenHeight = Dimensions.get('window').height; // Поточна висота екрану
  const idealHeight = (screenHeight / baseScreenHeight) * 225; // Обчислення ідеальної висоти
  return Math.max(minHeight, Math.min(idealHeight, maxHeight)); // Обмеження ідеальної висоти
}
export function currentWidthSize(minWidth, maxWidth, baseScreenWidth) {
  const screenWidth = Dimensions.get('window').width; // Current screen width
  const scaledWidth = (screenWidth / defaultWidth) * size; // Calculate scaled width
  return Math.max(minWidth, Math.min(scaledWidth, maxWidth));
}
