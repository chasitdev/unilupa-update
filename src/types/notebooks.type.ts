export interface NotebookObject {
  id: string;
  text: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GratitudeNotebookInterface {
  data: NotebookObject[];
  count: number;
  page: number;
  pageSize: number;
}

export interface DesireNotebookInterface {
  data: NotebookObject[];
  count: number;
  page: number;
  pageSize: number;
}

export interface WellbeingObject {
  id: string;
  mood: number;
  feel: string;
  createAt: Date;
  updatedAt: Date;
}

export interface WellbeingNotebookInterface {
  data: WellbeingObject[];
  count: number;
  page: number;
  pageSize: number;
}
