import TextTitle from '../Text/TextCustom';
import React from 'react';
import {View, StyleSheet, SafeAreaView, Image} from 'react-native';
import {icon} from 'src/assets/icons';

interface Props {
  title: string;
}
const Header: React.FC<Props> = props => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={icon.logoIcon} style={styles.logo} />
          <TextTitle
            fontSize={18}
            lineHeight={28}
            fontWeight="700"
            color="#15483C">
            {props.title}
          </TextTitle>
        </View>

        <Image source={icon.profileIcon} style={styles.profile} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 64,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#EAECF0',
  },
  logo: {
    width: 32,
    height: 32,
  },
  logoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  profile: {
    width: 40,
    height: 40,
  },
});

export default Header;
