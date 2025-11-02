export interface IPropsDate {
  onChangeDate: (date: string) => void;
  date: Date;
  minDate?: Date;
  maxDate?: Date;
  mode?: 'date' | 'time' | 'datetime';
  style?: Object;
}