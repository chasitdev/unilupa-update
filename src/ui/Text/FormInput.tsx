import {color} from '@utils/colors';
import {icon} from 'src/assets/icons';
import React, {useState} from 'react';
import {
  Image,
  ImageSourcePropType,
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import TextCustom from './TextCustom';
import Offset from '../Offset/Offset';
import Error from '../Errors/Error';

interface Props {
  title?: string;
  additionalTitle?: string;
  placeholder?: string;
  value: string;
  setValue: (value: string) => void;
  isPassword?: boolean;
  errorMessage?: string;
  showError?: boolean;
  iconLeftText?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  styleError?: StyleProp<ViewStyle>;
  styleIconError?: StyleProp<ViewStyle>;
  maxLength?: number;
  multiline?: boolean;
}

const FromInput: React.FC<Props> = props => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      <View
        style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        {props.iconLeftText && (
          <Image
            source={props.iconLeftText}
            alt="icon"
            style={styles.iconLeftText}
          />
        )}
        {props?.title && (
          <TextCustom
            color={'#ffffff'}
            fontSize={16}
            fontWeight="600"
            lineHeight={19}>
            {props.title}
          </TextCustom>
        )}
        {props.additionalTitle && (
          <TextCustom
            color={'#667085'}
            fontWeight="500"
            fontSize={14}
            lineHeight={20}>
            {props.additionalTitle}
          </TextCustom>
        )}
      </View>
      {(props?.title || props?.additionalTitle) && <Offset mt={10} />}
      <View
        style={[
          styles.inputContainer,
          props.style,
          props.errorMessage ? styles.error : null,
        ]}>
        <TextInput
          maxLength={props?.maxLength || 30}
          autoCapitalize="none"
          secureTextEntry={props.isPassword ? !showPassword : false}
          value={props.value}
          onChangeText={(v: string) => props.setValue(v)}
          style={[styles.input, props.styleInput]}
          placeholder={props.placeholder || ''}
          placeholderTextColor={'#91939F'}
          multiline={props.multiline || false}
        />
        {props.errorMessage && !props.isPassword && (
          <Image
            source={icon.alertCircle}
            style={[styles.icon, props.styleIconError]}
          />
        )}
        {props.errorMessage && props.isPassword && (
          <View style={styles.errorContainer}>
            <Image source={icon.alertCircle} style={[styles.icon]} />
            <Image source={icon.line} style={styles.line} />
          </View>
        )}

        {props.isPassword && (
          <View style={{position: 'relative', width: 32}}>
            <TouchableOpacity onPress={toggleShowPassword}>
              <Image
                source={showPassword ? icon.eyeoff : icon.eye}
                // style={styles.eyeIcon}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
      {props.showError && (
        <Error
          style={props.styleError}
          errorMessage={props.errorMessage ?? ''}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconLeftText: {
    marginRight: 5,
    width: 20,
    height: 20,
  },
  container: {},
  errorIcon: {
    marginRight: 10,
  },
  icon: {
    width: 24,
    height: 24,
    marginLeft: 10,
    position: 'relative',
  },
  input: {
    fontSize: RFValue(18, 932),
    fontWeight: '400',
    fontFamily: 'Raleway',
    color: 'black',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: 'white',
    borderColor: 'transparent',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: Platform.OS === 'ios' ? 12 : 0,
    minHeight: 50,
    display: 'flex',
    flexDirection: 'row',
    // alignItems: 'flex-start',
    position: 'relative',
  },
  error: {
    borderColor: color.error,
    height: 'auto',
  },
  line: {
    width: 2,
    height: 24,
    marginLeft: 10,
  },
  errorContainer: {
    flexDirection: 'row',
  },
});

export default FromInput;
