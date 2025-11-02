import {IDefaultOpportunitiesFilters} from 'src/types/filter.type';

export interface IPropsAgeRate {
  title: string;
  onChangeFilter: ({}: IDefaultOpportunitiesFilters) => void;
  filter: IDefaultOpportunitiesFilters;
}
