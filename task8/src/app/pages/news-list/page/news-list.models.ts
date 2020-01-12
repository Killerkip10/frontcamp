export interface INews {
  id: number;
  title: string;
  description: string;
  author: string;
  type: number;
}

export interface IExternalNews {
  status: string;
  copyright: string;
  section: string;
  results: INews[];
}
