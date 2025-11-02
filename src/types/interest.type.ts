export interface IInterest {
  id: string;
  emoji: string;
  title: string;
  category: InterestCategory;
}

export enum InterestCategory {
  Sport = 'Sport',
  Creativity = 'Creativity',
  SocialLife = 'Social life',
  HomeEntertainment = 'Home entertainment',
  MoviesAndTV = 'Movies and TV',
  Literature = 'Literature',
  Music = 'Music',
  FoodAndDrinks = 'Food and drinks',
  ActiveRest = 'Active rest',
  Pets = 'Pets',
}
