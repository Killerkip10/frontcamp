import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { API } from 'src/app/configs/api';

import { INews, IExternalNews } from './news-list.models';
import { NEWS_TYPE } from './constants';

@Injectable()
export class NewsListService {
  private newsList: INews[] = [];

  private newsList$ = new Subject<INews[]>();

  constructor(
    private http: HttpClient
  ) { }

  public get getNewsListSubject() {
    return this.newsList$;
  }

  public getNewsList(type: NEWS_TYPE = NEWS_TYPE.ALL, title: string = ''): void {
    this.newsList$.next(
      this.newsList.filter(n => (type === NEWS_TYPE.ALL || n.type === type) && n.title.startsWith(title)),
    );
  }

  public getAllNewsListRequest() {
    return this.getNewsListExternal()
      .pipe(
        mergeMap(() => this.getNewsListLocal()),
      );
  }

  private getNewsListExternal() {
    return this.http.get<IExternalNews>(API.GET_NEWS_EXTERNAL)
      .pipe(
        map(resp => this.newsList = [
          ...this.newsList,
          ...resp.results.map(n => ({ ...n, type: NEWS_TYPE.EXTERNAL })),
        ]),
      );
  }

  private getNewsListLocal() {
    return this.http.get<INews[]>(API.GET_NEWS_LOCAL)
      .pipe(
        map(resp => this.newsList = [
          ...this.newsList,
          ...resp.map(n => ({ ...n, type: NEWS_TYPE.LOCAL })),
        ]),
      );
  }
}
