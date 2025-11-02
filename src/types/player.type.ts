export interface IPlayTrack {
  id: string;
  name: string;
  currentTime: number;
}

export interface PlayerListPropsInterface {
  width: number;
  height: number;
  track: DefaultAudioInterface;
  style?: ViewStyle;
  playTrack: IPlayTrack | null;
}
