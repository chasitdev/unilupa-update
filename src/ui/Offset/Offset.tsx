import React from 'react';
import {offsetStyles} from './styles/offset.style';
import {IOffset} from './types/type';
import {View} from 'react-native';

const Offset: React.FC<IOffset> = ({children, mb, mt, ml, mr}: IOffset) => {
  const styles = {
    marginBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginRight: 0,
  };
  if (mb) {
    styles.marginBottom = mb;
  } else if (mt) {
    styles.marginTop = mt;
  } else if (ml) {
    styles.marginLeft = ml;
  } else if (mr) {
    styles.marginRight = mr;
  }
  return (
    <View
      style={{
        ...offsetStyles.container,
        ...styles,
      }}>
      {children}
    </View>
  );
};

export default Offset;
