import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { INews } from 'src/app/core';
import { PATH } from 'src/app/configs/path';

import { NewsCreateService } from './news-create.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
})
export class NewsCreateComponent {
  constructor(
    private newsCreateService: NewsCreateService,
    private router: Router,
  ) { }

  public onNewsSave(news: INews): void {
    this.newsCreateService.createNewsRequest(news)
      .subscribe(() => this.router.navigate([PATH.NEWS_LIST]));
  }
}
