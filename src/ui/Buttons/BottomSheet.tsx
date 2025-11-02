import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Platform,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import TextCustom from '../Text/TextCustom';

const {height} = Dimensions.get('window');

interface Props {
  isOpen: true | null | string;
  onClose: () => void;
  onSend: (comment: string, rate: number) => void;
}

const BottomSheet: React.FC<Props> = props => {
  const [comment, setComment] = useState('');
  const [rate, setRate] = useState(5);

  const handleTextChange = (text: string) => {
    const lines = text.split('\n');
    if (lines.length <= 10) {
      setComment(text);
    }
  };

  const handleSend = () => {
    if (comment.length < 10) {
      return;
    }

    props.onSend(comment, rate);
    setComment('');
    setRate(5);
    props.onClose();
  };

  const isChild = props.isOpen !== null && props.isOpen !== true;

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Modal
          isVisible={props.isOpen !== null}
          onBackdropPress={props.onClose}
          swipeDirection="down"
          onSwipeComplete={props.onClose}
          style={styles.modal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.bottomSheet}>
              <View style={styles.dragIndicator} />

              {!isChild && (
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 8,
                    marginLeft: 16,
                    marginBottom: 16,
                    marginTop: 8,
                    alignItems: 'flex-end',
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 4,
                      marginLeft: 8,
                    }}>
                    {[1, 2, 3, 4, 5].map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={0.7}
                        onPress={() => {
                          setRate(index + 1);
                        }}>
                        <Image
                          source={require('@assets/icons/star.png')}
                          style={{
                            width: 24,
                            height: 24,
                            tintColor: index < rate ? '#FFC700' : '#91939F',
                          }}
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              )}

              <View style={styles.name}>
                <TextInput
                  style={styles.nameInput}
                  onChangeText={handleTextChange}
                  value={comment}
                  placeholder={'Введіть свій коментар'}
                  placeholderTextColor={'black'}
                  multiline={true}
                  numberOfLines={10}
                />

                <TextCustom
                  fontSize={14}
                  fontWeight="300"
                  lineHeight={19}
                  style={styles.label}>
                  {isChild ? 'Відповісти' : 'Відгук'}
                </TextCustom>
              </View>
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <TextCustom
                  fontSize={12}
                  fontWeight="400"
                  color="#FFFFFF65"
                  lineHeight={19}>
                  Мінімум 10 символів
                </TextCustom>
              </View>
              <TouchableOpacity style={styles.saveButton} onPress={handleSend}>
                <TextCustom fontSize={18} fontWeight="600" lineHeight={19}>
                  Відправити
                </TextCustom>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  button: {
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  bottomSheet: {
    backgroundColor: '#000000FF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    minHeight: height * 0.45,
  },
  dragIndicator: {
    width: 50,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#6200ee',
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  nameInput: {
    width: '100%',
    borderWidth: 1,
    backgroundColor: 'transparent',
    borderColor: 'white',
    borderRadius: 8,
    padding: 16,
    textAlignVertical: 'top',
    height: 150,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    color: 'white',
    lineHeight: 23,
  },
  label: {
    position: 'absolute',
    bottom: 140,
    marginLeft: 12,
    backgroundColor: 'black',
    paddingHorizontal: 6,
    color: '#FFFFFFAA',
  },
  name: {
    marginTop: 8,
  },
  saveButton: {
    backgroundColor: '#0E46F1',
    width: '100%',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
  },
});

export default BottomSheet;
