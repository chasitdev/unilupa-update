import {icon} from 'src/assets/icons';
import React from 'react';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';

const SearchBarUniversityScreen = () => {
  return (
    <View style={styles.topContainer}>
      <View style={styles.container}>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image source={icon.search} style={styles.icon} />
          </TouchableOpacity>
          <Text>{'\u00A0\u00A0'}</Text>
          <TextInput style={styles.input} placeholder="Пошук" />
          <Image source={icon.line} style={styles.line} />
          <TouchableOpacity>
            <Image source={icon.filter} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    width: '92%',
    height: Platform.OS === 'ios' ? 45 : 45,
    display: 'flex',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    fontWeight: '400',
    fontSize: RFValue(14, 932),
  },
  line: {
    width: 2,
    height: 24,
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  icons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  backButton: {
    backgroundColor: '#0E46F1',
    marginRight: 8,
    width: 45,
    height: 45,
    justifyContent: 'center',
    borderRadius: 8,
  },
  topContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    marginTop: 30,
  },
  backIcon: {
    marginLeft: 10,
  },
});

export default SearchBarUniversityScreen;
