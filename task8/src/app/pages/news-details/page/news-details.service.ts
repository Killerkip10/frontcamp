import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map, finalize } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { HttpService, INews, IExternalNews } from 'src/app/core';

@Injectable()
export class NewsDetailsService {
  private isFetching$ = new Subject<boolean>();
  private newsDetails$ = new Subject<INews>();

  constructor(
    private httpService: HttpService,
  ) { }

  public get getNewsDetailsSubject(): Subject<INews> {
    return this.newsDetails$;
  }

  public get getIsFetchingSubject(): Subject<boolean> {
    return this.isFetching$;
  }

  public getNewsLocalByIdRequest(id: number) {
    this.isFetching$.next(true);

    return this.httpService.get<INews>(`${API.NEWS_LOCAL}/${id}`)
      .pipe(
        map(resp => this.newsDetails$.next(resp)),
        finalize(() => this.isFetching$.next(false)),
      );
  }

  public getNewsExternalByIdRequest(id: number) {
    this.isFetching$.next(true);

    return this.httpService.get<IExternalNews>(API.NEWS_EXTERNAL)
      .pipe(
        map(resp => this.newsDetails$.next(resp.results[id])),
        finalize(() => this.isFetching$.next(false)),
      );
  }
}
