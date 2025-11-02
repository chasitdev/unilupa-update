import React, {useRef, useState} from 'react';
import {TextInput, View, StyleSheet, Keyboard} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import {color} from '@utils/colors';

interface Props {
  onChange: (code: string) => void;
  isError?: boolean;
}

const CodeInput: React.FC<Props> = props => {
  const [code, setCode] = useState(['', '', '', '']);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const inputs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const focusNext = (nextRef: React.RefObject<TextInput>, index: number) => {
    return (value: string) => {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);
      props.onChange(newCode.join(''));
      // props.onChange();
      if (value) {
        if (nextRef.current) {
          nextRef.current.focus();
          setFocusedIndex(index + 1);
        }
      } else if (index > 0) {
        inputs[index - 1].current?.focus();
        setFocusedIndex(index - 1);
      }
      if (index === 3 && value) {
        Keyboard.dismiss();
      }
    };
  };

  const handleBackspace = (
    prevRef: React.RefObject<TextInput>,
    index: number,
  ) => {
    return () => {
      if (!code[index]) {
        if (prevRef.current) {
          prevRef.current.focus();
          setFocusedIndex(index - 1);
        }
      }
    };
  };

  const handleFocus = (index: number) => {
    setFocusedIndex(index);
  };

  return (
    <View style={styles.container}>
      {inputs.map((inputRef, index) => (
        <View
          key={index}
          style={[
            focusedIndex === index
              ? styles.focusedInput
              : styles.unfocusedInput,
          ]}>
          <TextInput
            caretHidden
            key={index}
            ref={inputRef}
            style={[
              styles.input,
              code.join('').length === 4
                ? styles.filledInput
                : styles.emptyInput,

              props.isError ? styles.errorInput : null,
            ]}
            onChangeText={focusNext(
              inputs[index + 1] || inputs[inputs.length - 1],
              index,
            )}
            onKeyPress={({nativeEvent}) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(inputs[index - 1] || inputs[0], index)();
              }
            }}
            onFocus={() => handleFocus(index)}
            value={code[index]}
            keyboardType="numeric"
            maxLength={1}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    width: 64,
    height: 64,
    fontSize: RFValue(48),
    fontWeight: '500',
    textAlignVertical: 'center',
    borderWidth: 2,
    borderColor: color.borderPrimary,
    color: color.borderPrimary,
    textAlign: 'center',
    borderRadius: 8,
  },
  focusedInput: {
    borderRadius: 14,
    borderWidth: 6,
    borderColor: 'rgba(158, 119, 237, 0.24)',
  },
  unfocusedInput: {
    borderRadius: 14,
    borderWidth: 6,
    borderColor: 'transparent',
  },
  emptyInput: {
    borderColor: 'rgba(200, 200, 200, 0.5)',
    borderWidth: 2,
  },
  filledInput: {
    borderColor: color.buttonPrimary,
    borderWidth: 2,
    color: color.buttonPrimary,
  },
  errorInput: {
    borderColor: color.error,
    borderWidth: 2,
    color: color.errorText,
  },
});

export default CodeInput;
