export interface FilterInterface {
  sort: string;
  locations: string[];
  speciality: string[];
  priceRange: number[];
  studyMode: string;
  budgetPlacesAvailable: string;
  percentRange: number[];
  hostelCost: number[];
  education: 'Всі' | 'Бакалавр' | 'Магістр' | 'Фаховий молодший бакалавр';
}

export const defaultFilter: FilterInterface = {
  sort: '',
  locations: [],
  speciality: [],
  priceRange: [0, 400000],
  studyMode: 'всі',
  budgetPlacesAvailable: 'Всі',
  percentRange: [0, 100],
  hostelCost: [0, 10000],
  education: 'Всі',
};
export type filterSex = 'A' | 'M' | 'F' | null;

export interface IDefaultOpportunitiesFilters {
  clasif: [],
  type: [],
  min_age: number | null,
  max_age: number | null,
  // min_date: Date | null,
  // max_date: Date | null,
  location: string | null,
  sex: filterSex,
  [key:string]: any;
}

export const defaultOpportunitiesFilters:IDefaultOpportunitiesFilters = {
  clasif: [],
  type: [],
  min_age: null,
  max_age: null,
  // min_date: null,
  // max_date: null,
  location: null,
  sex: null,
}

export const sortPickerItems: PickerItem[] = [
  {label: 'Назвою А-Я', value: 'nameA'},
  {label: 'Назвою Я-А', value: 'nameZ'},
  {label: 'Зростанням ціни', value: 'costMin'},
  {label: 'Спаданням ціни', value: 'costMax'},
  {label: 'Рейтингом', value: 'rating'},
  {label: 'Відстанню ближче', value: 'distanceMin'},
  {label: 'Відстанню далі', value: 'distanceMax'},
];

export const locationPickerItems: PickerItem[] = [
  {label: 'Вся Україна', value: 'Вся Україна'},
  {label: 'м. Київ', value: 'м. Київ'},
  {label: 'Вінницька', value: 'Вінницька'},
  {label: 'Волинська', value: 'Волинська'},
  {label: 'Дніпропетровська', value: 'Дніпропетровська'},
  {label: 'Донецька', value: 'Донецька'},
  {label: 'Житомирська', value: 'Житомирська'},
  {label: 'Закарпатська', value: 'Закарпатська'},
  {label: 'Запорізька', value: 'Запорізька'},
  {label: 'Івано-Франківська', value: 'Івано-Франківська'},
  {label: 'Київська', value: 'Київська'},
  {label: 'Кіровоградська', value: 'Кіровоградська'},
  {label: 'Луганська', value: 'Луганська'},
  {label: 'Львівська', value: 'Львівська'},
  {label: 'Миколаївська', value: 'Миколаївська'},
  {label: 'Одеська', value: 'Одеська'},
  {label: 'Полтавська', value: 'Полтавська'},
  {label: 'Рівненська', value: 'Рівненська'},
  {label: 'Сумська', value: 'Сумська'},
  {label: 'Тернопільська', value: 'Тернопільська'},
  {label: 'Харківська', value: 'Харківська'},
  {label: 'Херсонська', value: 'Херсонська'},
  {label: 'Хмельницька', value: 'Хмельницька'},
  {label: 'Черкаська', value: 'Черкаська'},
  {label: 'Чернівецька', value: 'Чернівецька'},
  {label: 'Чернігівська', value: 'Чернігівська'},
];

export interface PickerItem {
  label: string;
  value: string | undefined;
}

export interface SliderItem {
  minValue: number;
  maxValue: number;
}
