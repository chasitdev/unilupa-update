import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CircleDotsGradientAnimation} from '../../../ui/Gradients/GradientCircleAnimation';
import TextCustom from 'src/ui/Text/TextCustom';
import {spacing} from '@utils/spacing';

interface Props {}

const SplashScreen: React.FC<Props> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.activityIndicator}>
        <CircleDotsGradientAnimation />
        <TextCustom fontSize={14}> Loading...</TextCustom>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 194,
    height: 220,
  },
  middleTitle: {
    marginVertical: 32,
  },
  activityIndicator: {
    height: 68,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: spacing.xl,
  },
});

export default SplashScreen;
