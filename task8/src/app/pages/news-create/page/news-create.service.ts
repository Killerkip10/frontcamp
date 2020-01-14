import { Injectable } from '@angular/core';

import { HttpService, INews } from 'src/app/core';
import { API } from 'src/app/configs/api';

@Injectable()
export class NewsCreateService {
  constructor(
    private httpService: HttpService,
  ) { }

  public createNewsRequest(news: INews) {
    return this.httpService.post<INews>(API.NEWS_LOCAL, news);
  }
}
