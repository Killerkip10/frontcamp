import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, finalize, mergeMap } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { HttpService, AuthenticationService, INews, IExternalNews, NEWS_TYPE } from 'src/app/core';

export interface IQuery {
  typeId?: number;
  title?: string;
  createdByMe?: boolean;
  top?: number;
}

@Injectable()
export class NewsService {
  private query: IQuery = {
    typeId: NEWS_TYPE.ALL,
    title: '',
    createdByMe: false,
    top: 5,
  };

  private newsList: INews[] = [];
  private newsList$ = new Subject<INews[]>();
  private isFetching$ = new Subject<boolean>();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService,
  ) { }

  public get getNewsListSubject() {
    return this.newsList$;
  }

  public get getIsFetchingSubject() {
    return this.isFetching$;
  }

  public get getQuery(): IQuery {
    return this.query;
  }

  public getNewsList({
    typeId = this.query.typeId,
    title = this.query.title,
    createdByMe = this.query.createdByMe,
    top = this.query.top,
  }: IQuery = {}): void {
    this.query.typeId = typeId;
    this.query.title = title;
    this.query.createdByMe = createdByMe;
    this.query.top = top;

    this.newsList$.next(
      this.newsList
        .slice(0, top)
        .filter(n => (
          this.typeFilter(n.type, typeId)
          && this.titleFilter(n.title, title)
          && this.isCreatedByMeFilter(this.query.createdByMe, n.authorId)
        )),
    );
  }

  public getAllNewsListRequest() {
    this.isFetching$.next(true);

    return this.getNewsListExternal()
      .pipe(
        mergeMap(() => this.getNewsListLocal()),
        finalize(() => this.isFetching$.next(false)),
      );
  }

  public deleteNewsRequest(id: number) {
    this.isFetching$.next(true);

    return this.httpService.delete(`${API.NEWS_LOCAL}/${id}`)
      .pipe(
        map(() => {
          this.newsList = this.newsList.filter(n => n.id !== id);
          this.getNewsList();
        }),
        finalize(() => this.isFetching$.next(false)),
      );
  }

  private getNewsListExternal() {
    return this.httpService.get<IExternalNews>(API.NEWS_EXTERNAL)
      .pipe(
        map(resp => this.newsList = [
          ...resp.results.map((n, i) => ({ ...n, id: i, type: NEWS_TYPE.EXTERNAL })),
        ]),
      );
  }

  private getNewsListLocal() {
    return this.httpService.get<INews[]>(API.NEWS_LOCAL)
      .pipe(
        map(resp => this.newsList = [
          ...this.newsList,
          ...resp.map(n => ({ ...n, type: NEWS_TYPE.LOCAL })),
        ]),
      );
  }

  private typeFilter(newsTypeId: number, typeId: number): boolean {
    if (typeId === NEWS_TYPE.ALL) {
      return true;
    }

    return newsTypeId === typeId;
  }

  private titleFilter(newsTitle: string, title: string): boolean {
    return newsTitle.startsWith(title);
  }

  private isCreatedByMeFilter(createdByMe: boolean, authorId: string): boolean {
    if (!createdByMe) {
      return true;
    }

    const user = this.authenticationService.getUserSubject.getValue();

    return user.id === authorId;
  }
}
