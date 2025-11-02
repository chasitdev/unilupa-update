export interface ButtonLoginInterface {
  id: string;
  platform: string;
  text: string;
  icon: number;
}

export interface ButtonsLoginInterface {
  ios: ButtonLoginInterface[];
  android: ButtonLoginInterface[];
}
