import {IDefaultOpportunitiesFilters} from 'src/types/filter.type';

export interface IPropsLocationFilterNews {
  title: string;
  onChangeFilter: ({}: any) => void;
  filter: any;
  // onChangeFilter: ({}: IDefaultOpportunitiesFilters) => void;
  // filter: IDefaultOpportunitiesFilters;
}
