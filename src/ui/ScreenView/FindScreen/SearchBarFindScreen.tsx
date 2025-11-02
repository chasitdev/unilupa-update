import {Navigation} from 'src/navigation/types/navigation.type';
import {StackScreenBottomMenu} from 'src/types/screens.type';
import {icon} from 'src/assets/icons';
import React, {useState} from 'react';
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
import ButtonBack from 'src/ui/Buttons/ButtonBack';
import Offset from 'src/ui/Offset/Offset';

interface Props {
  navigation: Navigation;
  handleOpenFiltersModal?: () => void;
  handleChangeScreen: (path: string) => void;
  onChange: (value: string) => void;
  handleBack?: () => void | undefined;
}

const SearchBarFindScreen: React.FC<Props> = props => {
  const [searchText, setSearchText] = useState('');

  return (
    <View style={styles.topContainer}>
      {props?.handleBack && (
        <>
          <ButtonBack onPress={props.handleBack} />
          <Offset mr={10} />
        </>
      )}
      <View style={styles.containerSearch}>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Image source={icon.search} style={styles.icon} />
          </TouchableOpacity>
          <Text>{'\u00A0\u00A0'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Пошук"
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              props.onChange(text);
            }}
          />
          {typeof props?.handleOpenFiltersModal === 'function' && (
            <Image source={icon.line} style={styles.line} />
          )}
          {typeof props?.handleOpenFiltersModal === 'function' && (
            <TouchableOpacity onPress={props.handleOpenFiltersModal}>
              <Image source={icon.filter} style={styles.icon} />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <View style={styles.containerProfileSetting}>
        <TouchableOpacity
          onPress={() =>
            props.handleChangeScreen(StackScreenBottomMenu.PROFILE)
          }>
          <Image source={icon.personWhite} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    // width: '100%',
    // justifyContent: 'center',
    marginTop: 12,
    display: 'flex',
    flexWrap: 'nowrap',
  },
  containerSearch: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    // width: '100%',
    height: Platform.OS === 'ios' ? 45 : 45,
    display: 'flex',
    justifyContent: 'center',
    position: 'relative',
    flex: 1,
  },
  containerProfileSetting: {
    position: 'relative',
    marginLeft: 15,
    borderRadius: 8,
    minWidth: 45,
    height: 45,
    backgroundColor: 'blue',
    // paddingHorizontal: 10,
    // paddingVertical: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  input: {
    flex: 1,
    fontWeight: '400',
    fontSize: RFValue(14, 932),
  },
  icons: {
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    paddingHorizontal: 10,
  },
});

export default SearchBarFindScreen;
