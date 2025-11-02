export interface IFilterItem {
  isActive: boolean;
  name: string;
  id: number;
}

export interface IFilterList {
  filters: IFilterItem[];
  handleFilter:(id: number)=>any;
}
