import {icon} from 'src/assets/icons';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import TextTitle from '../../Text/TextCustom';

interface GoogleAppleButtonsProps {
  headerText: string;
  onGooglePress: () => void;
  onApplePress: () => void;
}

const GoogleAppleButtons: React.FC<GoogleAppleButtonsProps> = ({
  headerText,
  onGooglePress,
  onApplePress,
}) => (
  <View style={styles.container}>
    <View style={styles.textContainer}>
      <View style={styles.line} />
      <TextTitle fontSize={14} fontWeight="400" style={styles.text}>
        {headerText}
      </TextTitle>
      <View style={styles.line} />
    </View>
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={onGooglePress}>
        <Image source={icon.googleImage} style={styles.icon} />
      </TouchableOpacity>
      {Platform.OS === 'ios' && (
        <TouchableOpacity style={styles.button} onPress={onApplePress}>
          <Image source={icon.appleImage} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 32,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 32,
  },
  text: {
    color: '#B0B0B0',
    marginHorizontal: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#B0B0B0',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#3D3B3E',
    backgroundColor: '#1C1C1E',
    borderRadius: 8,
    padding: 10,
    marginHorizontal: 15,
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default GoogleAppleButtons;
