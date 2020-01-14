import { INews } from 'src/app/core';

export interface IExternalNews {
  status: string;
  copyright: string;
  section: string;
  results: INews[];
}
