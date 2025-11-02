import React, {useEffect} from 'react';
import {Button, View} from 'react-native';
import {Text} from 'react-native';
import Calender from '../../Calender/Calender';
import {styles} from './styles/date-rate.style';
import {IDefaultOpportunitiesFilters} from 'src/types/filter.type';

interface IPropsDate {
  title: string;
  minDate: Date;
  maxDate: Date;
  mode?: 'date' | 'time' | 'datetime';

  onChangeFilter: ({}: IDefaultOpportunitiesFilters) => void;
  filter: IDefaultOpportunitiesFilters;
}

const DateRate: React.FC<IPropsDate> = ({
  title,
  minDate,
  maxDate,
  onChangeFilter,
  filter,
}: IPropsDate) => {
  const [selectedDateFrom, setSelectedDatFrom] = React.useState(
    filter.min_date ?? '',
  );
  const [selectedDateTo, setSelectedDateTo] = React.useState(
    filter.max_date ?? '',
  );
  const [showFrom, setShowFrom] = React.useState(false);
  const [showTo, setShowTo] = React.useState(false);

  useEffect(() => {
    if (filter.min_date === null) {
      setSelectedDatFrom('');
    }
    if (filter.max_date === null) {
      setSelectedDateTo('');
    }
  }, [filter.min_date, filter.max_date]);
  const onDayPressFrom = (day: any) => {
    if (
      selectedDateTo &&
      new Date(day).getTime() > new Date(selectedDateTo).getTime()
    ) {
      setSelectedDateTo('');
      onChangeFilter({
        ...filter,
        max_date: null,
      });
    }
    setSelectedDatFrom(day);
    onChangeFilter({
      ...filter,
      min_date: day,
    });
    setShowFrom(false);
  };
  const onDayPressTo = (day: any) => {
    console.log('day', day);
    setSelectedDateTo(day);
    onChangeFilter({
      ...filter,
      max_date: day,
    });
    setShowTo(false);
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
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.containerControllers}>
        <View>
          <Button
            title={
              selectedDateFrom
                ? 'c ' + formateDate(selectedDateFrom.toString())
                : 'c ' + formateDate(minDate + '')
            }
            onPress={() => setShowFrom(true)}
          />
          {showFrom && (
            <Calender
              onChangeDate={onDayPressFrom}
              date={new Date(selectedDateFrom)}
              mode="date"
              minDate={minDate}
              maxDate={maxDate}
            />
          )}
        </View>
        <View>
          <Button
            title={
              selectedDateTo
                ? 'по ' + formateDate(selectedDateTo.toString())
                : 'по ' + formateDate(maxDate + '')
            }
            onPress={() => setShowTo(true)}
          />
          {showTo && (
            <Calender
              onChangeDate={onDayPressTo}
              minDate={selectedDateFrom ? new Date(selectedDateFrom) : minDate}
              maxDate={maxDate}
              date={new Date(selectedDateTo)}
              mode="date"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default DateRate;
