import {Navigation} from 'src/navigation/types/navigation.type';
import {icon} from 'src/assets/icons';
import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

interface Props {
  pathCameBack?: string;
  ref?: React.Ref<TopBarRef>;
  onPress?: () => void;
}

export interface TopBarRef {
  setOpacity: (newOpacity: number) => void;
}

const HeaderActions = forwardRef<TopBarRef, Props>((props, ref) => {
  const [opacity, setOpacity] = useState(1);
  const navigation = useNavigation<Navigation>();

  // Додаємо функціональність для рефів
  useImperativeHandle(ref, () => ({
    setOpacity: (newOpacity: number) => {
      setOpacity(newOpacity);
    },
  }));

  const backToMain = () => {
    if (props?.onPress) {
      return props.onPress();
    } else if (props?.pathCameBack) {
      return navigation.navigate(props?.pathCameBack);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={[styles.top, {opacity}]}>
        <TouchableOpacity style={styles.topButton} onPress={backToMain}>
          <Image source={icon.backIcon} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
});

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    zIndex: 3000,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 15,
    position: 'absolute',
    top: 16,
    alignSelf: 'center',
    zIndex: 3000,
  },
  icon: {
    width: 24,
    height: 24,
  },
  topButton: {
    backgroundColor: '#0E46F1',
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
});

export default HeaderActions;
