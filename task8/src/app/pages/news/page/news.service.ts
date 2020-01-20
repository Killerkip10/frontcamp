import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { HttpService, AuthenticationService, INews, IExternalNews, NEWS_TYPE } from 'src/app/core';

interface IQuery {
  typeId?: number;
  title?: string;
  createdByMe?: boolean;
}

@Injectable()
export class NewsService {
  private query: IQuery = {
    typeId: NEWS_TYPE.ALL,
    title: '',
    createdByMe: false,
  };

  private newsList: INews[] = [];
  private newsList$ = new Subject<INews[]>();

  constructor(
    private httpService: HttpService,
    private authenticationService: AuthenticationService,
  ) { }

  public get getNewsListSubject() {
    return this.newsList$;
  }

  public getNewsList({ typeId = this.query.typeId, title = this.query.title, createdByMe = this.query.createdByMe }: IQuery = {}): void {
    this.query.typeId = typeId;
    this.query.title = title;
    this.query.createdByMe = createdByMe;

    this.newsList$.next(
      this.newsList.filter(n => (
        this.typeFilter(n.type, typeId)
        && this.titleFilter(n.title, title)
        && this.isCreatedByMeFilter(this.query.createdByMe, n.authorId)
      )),
    );
  }

  public getAllNewsListRequest() {
    return this.getNewsListExternal()
      .pipe(
        mergeMap(() => this.getNewsListLocal()),
      );
  }

  public deleteNewsRequest(id: number) {
    return this.httpService.delete(`${API.NEWS_LOCAL}/${id}`)
      .pipe(
        map(() => {
          this.newsList = this.newsList.filter(n => n.id !== id);
          this.getNewsList();
        })
      );
  }

  private getNewsListExternal() {
    return this.httpService.get<IExternalNews>(API.NEWS_EXTERNAL)
      .pipe(
        map(resp => this.newsList = [
          ...this.newsList,
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
