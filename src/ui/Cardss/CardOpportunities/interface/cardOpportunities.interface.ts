import {IOneNews} from 'src/screens/Opportunities/interface/opportunities.interface';

export interface ICardOpportunities {
  item: IOneNews;
  handleChangeScreen: (path: string, id: string) => any;
  handleAddOrRemoveWishlist: (newsId: string, title: string) => Promise<void>;
  pathToScreen: string;
  isSaved: boolean;
  remove?: boolean;
}
