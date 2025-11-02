import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Text} from 'react-native';
import Calender from '../../ui/Calender/Calender';
import {styles} from './styles/date.style';
import Offset from 'src/ui/Offset/Offset';
import Error from 'src/ui/Errors/Error';
import { color } from 'src/utils/colors';
import { icon } from 'src/assets/icons';

interface IPropsDate {
  title: string;
  mode?: 'date' | 'time' | 'datetime';
  onChangeData: ({}: any) => void;
  data: any;
  keyObj: string;
  placeholder: string;
  style?: StyleProp<ViewStyle>;
  styleInput?: StyleProp<ViewStyle>;
  iconLeftText?: ImageSourcePropType;
  errorMessage?: string;
}

const FormInputCelender: React.FC<IPropsDate> = ({
  title,
  onChangeData,
  data,
  mode = 'date',
  keyObj,
  style,
  styleInput,
  placeholder,
  iconLeftText,
  errorMessage,
}: IPropsDate) => {
  const [selectedDate, setSelectedDate] = React.useState(data.min_date ?? '');
  const [showCelender, setShowCelender] = React.useState(false);
  let customStyle = {};
  if (style) {
    customStyle = style;
  }
  // useEffect(() => {
  //   if (data.min_date === null) {
  //     setSelectedDate('');
  //   }
  // }, [data.min_date]);
  const onChangeDataCustom = (day: any) => {
    console.log({day: formateDate(day)});
    setSelectedDate(day);
    onChangeData({
      ...data,
      [keyObj]: day,
    });
    setShowCelender(false);
  };

  const formateDate = (date: string) => {
    const d = new Date(date);
    const day = d.getDate();
    const month = d.getMonth() + 1; // Months are zero-based
    const year = d.getFullYear();
    return `${day < 10 ? '0' + day : day}.${
      month < 10 ? '0' + month : month
    }.${year}`;
  };
  return (
    <View style={{...styles.container, ...customStyle}}>
      <View style={styles.containerTitle}>
        {iconLeftText && (
          <Image source={iconLeftText} alt="icon" style={styles.iconLeftText} />
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Offset mt={8} />
      <View
        style={[
          {...styles.containerControllers},
          styleInput,
          {
            borderColor: errorMessage ? color.error : '#8F8F92',
          },
        ]}>
        <TouchableOpacity onPress={() => setShowCelender(true)}>
          {showCelender ? (
            <Calender
              onChangeDate={onChangeDataCustom}
              date={new Date()}
              mode={mode}
              minDate={new Date()}
              style={{
                zIndex: 99999,
              }}
            />
          ) : (
            <Text
              style={{
                color: '#91939F',
                padding: 5,
                zIndex: 9998,
              }}>
              {selectedDate ? formateDate(selectedDate) : placeholder}
            </Text>
          )}
          {errorMessage && <Error errorMessage={errorMessage} />}
        </TouchableOpacity>
        {errorMessage && (
          <Image
            source={icon.alertCircle}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              right: 5,
            }}
          />
        )}
      </View>
    </View>
  );
};

export default FormInputCelender;
