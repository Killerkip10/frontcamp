import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { HttpService, INews, IExternalNews } from 'src/app/core';

@Injectable()
export class NewsDetailsService {
  private newsDetails$ = new Subject<INews>();

  constructor(
    private httpService: HttpService,
  ) { }

  public get getNewsDetailsSubject(): Subject<INews> {
    return this.newsDetails$;
  }

  public getNewsLocalByIdRequest(id: number) {
    return this.httpService.get<INews>(`${API.NEWS_LOCAL}/${id}`)
      .pipe(
        map(resp => this.newsDetails$.next(resp)),
      );
  }

  public getNewsExternalByIdRequest(id: number) {
    return this.httpService.get<IExternalNews>(API.NEWS_EXTERNAL)
      .pipe(
        map(resp => this.newsDetails$.next(resp.results[id])),
      );
  }
}
