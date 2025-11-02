import React, {useState} from 'react';
import {
  Image,
  KeyboardTypeOptions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextCustom from '../Text/TextCustom';

interface Props {
  title: string;
  placeholer: string;
  keyboardType?: KeyboardTypeOptions | undefined;
  secureTextEntry?: boolean;
  showVisibilityButton?: boolean;
  value: string;
  setValue: (value: string) => void;
}

const StyledInput: React.FC<Props> = props => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TextCustom fontSize={16} fontWeight="600" lineHeight={19}>
        {props.title}
      </TextCustom>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder={props.placeholer}
          keyboardType={props.keyboardType}
          secureTextEntry={props.secureTextEntry}
          placeholderTextColor={'#5E5F6B'}
        />

        {props.showVisibilityButton && (
          <TouchableOpacity
            style={styles.visibilityButton}
            onPress={() => setPasswordVisible(!passwordVisible)}>
            <Image
              style={styles.visibilityIcon}
              source={
                passwordVisible
                  ? require('@assets/icons/visibility_off.png')
                  : require('@assets/icons/visibility.png')
              }
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 16,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 8,
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  input: {
    backgroundColor: 'white',
    width: '100%',
    padding: 15,
    borderRadius: 8,
    flex: 1,
  },
  visibilityButton: {
    position: 'absolute',
    right: 10,
    height: '100%',
    justifyContent: 'center',
    padding: 10,
  },
  visibilityIcon: {
    width: 24,
    height: 24,
  },
});

export default StyledInput;
