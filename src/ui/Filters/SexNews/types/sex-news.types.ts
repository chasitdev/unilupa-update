import { IDefaultOpportunitiesFilters } from "src/types/filter.type";

export interface IPropsSexNews {
  title: string;
  onChangeFilter: ({ }: IDefaultOpportunitiesFilters) => void;
  filter: IDefaultOpportunitiesFilters;
}
export interface IRef extends HTMLElement {
  clearValues: () => void;
}