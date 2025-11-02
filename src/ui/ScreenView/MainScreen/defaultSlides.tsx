export interface SlidersInterface {
  id: string;
  title: string;
  color: string;
  image: number;
  isAvailable: boolean;
  url: string;
}

export const defauldSlides = [
  {
    id: '1',
    title: 'Meditation for begginers',
    color: 'green',
    image: require('@assets/RecomendedUniversity.png'),
    lock: true,
  },
  {
    id: '2',
    title: 'Meditation for profi',
    color: 'yellow',
    image: require('@assets/RecomendedUniversity.png'),
    lock: false,
  },
  {
    id: '3',
    title: 'Meditation for students',
    color: 'red',
    image: require('@assets/RecomendedUniversity.png'),
    lock: true,
  },
  {
    id: '4',
    title: 'Meditation for everybody',
    color: 'silver',
    image: require('@assets/RecomendedUniversity.png'),
    lock: false,
  },
  {
    id: '5',
    title: 'Meditation for nobody',
    color: 'orange',
    image: require('@assets/RecomendedUniversity.png'),
    lock: false,
  },
];
