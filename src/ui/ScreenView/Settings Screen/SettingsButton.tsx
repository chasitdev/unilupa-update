import TextTitle from '../../Text/TextCustom';
import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';

const SettingsButton = ({onPress, title, icon, color}) => (
  <TouchableOpacity style={styles.profileSetupButton} onPress={onPress}>
    <View style={styles.iconContainer}>
      <Image
        source={icon}
        style={[
          styles.icon,
          {
            tintColor: color,
          },
        ]}
      />
    </View>
    <TextTitle fontSize={18} fontWeight="600" lineHeight={19} color={color}>
      {title}
    </TextTitle>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  profileSetupButton: {
    backgroundColor: '#202026',
    borderWidth: 1,
    borderColor: '#3D3B3E',
    width: '100%',
    height: 50,
    alignItems: 'center',
    borderRadius: 8,
    flexDirection: 'row',
    marginBottom: 8,
  },
  iconContainer: {
    marginRight: 20,
    marginLeft: 15,
  },
  icon: {
    width: 24,
    height: 24,
  },
});

export default SettingsButton;
