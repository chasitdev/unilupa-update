import { HomeScreen, StackScreenBottomMenu } from "src/types/screens.type";

export interface NavigateParams {
  name: string;
  params: {
    screen: string;
    params?: any;
  };
}

export interface Navigation {
  navigate: (params: NavigateParams | string) => void;
  goBack: () => void;
}

export type RootStackParamList = {
  [StackScreenBottomMenu.HOME]: undefined;
  [StackScreenBottomMenu.Opportunities]: undefined;
  [StackScreenBottomMenu.WISHLIST]: undefined;
  [StackScreenBottomMenu.WISHLIST_OPPORTUNITIES]: undefined;
  [StackScreenBottomMenu.WISHLIST_UNIVERSITY]: undefined;
  [StackScreenBottomMenu.PROFILE]: undefined;
  [HomeScreen.FIND]: undefined;
  [HomeScreen.FILTER]: undefined;
  [HomeScreen.UNIVERSITY_INFORMATION]: undefined;
  [HomeScreen.COMPARISON]: undefined;
  // []: undefined;
  
}