import React from 'react'
import { View } from 'react-native'
import {Calendar} from 'react-native-calendars';
import { IPropsDate } from './types/date.types';



const Calender:React.FC<IPropsDate> = ({
  onChangeDate,
  date,
  minDate,
  maxDate,
  style={},
  mode = 'date',
}: IPropsDate) => {
  const [selectedDate, setSelectedDate] = React.useState(date);

  const onDayPress = (day: any) => {
    setSelectedDate(day.dateString);
    onChangeDate(day.dateString);
  };

  return (
    <View>
        <Calendar
          mode={mode}
          onDayPress={onDayPress}
          minDate={minDate && minDate}
          maxDate={maxDate && maxDate}
          // markedDates={{
          //   [selectedDate]: { selected: true, marked: true },
          // }}
        />
    </View>
  )
}

export default Calender;