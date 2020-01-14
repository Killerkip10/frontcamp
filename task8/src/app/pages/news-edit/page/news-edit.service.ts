import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { API } from 'src/app/configs/api';
import { HttpService, INews } from 'src/app/core';

@Injectable()
export class NewsEditService {
  private newsDetails$ = new Subject<INews>();

  constructor(
    private httpService: HttpService,
  ) { }

  public get getNewsDetailsSubject(): Subject<INews> {
    return this.newsDetails$;
  }

  public getNewsByIdRequest(id: number) {
    return this.httpService.get<INews>(`${API.NEWS_LOCAL}/${id}`)
      .pipe(
        map(resp => this.newsDetails$.next(resp)),
      );
  }

  public editNewsRequest(id: number, news: INews) {
    return this.httpService.put<INews>(`${API.NEWS_LOCAL}/${id}`, news);
  }
}
