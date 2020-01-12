import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { NewsListService } from './news-list.service';
import { INews } from './news-list.models';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
})
export class NewsListComponent implements OnInit, OnDestroy {
  public newsList: INews[] = [];

  private newsListSub: Subscription;

  constructor(
    private newsListService: NewsListService,
  ) { }

  public ngOnInit(): void {
    this.newsListSub = this.newsListService.getNewsListSubject
      .subscribe(newsList => this.newsList = newsList);

    this.newsListService.getAllNewsListRequest()
      .subscribe(() => this.newsListService.getNewsList());
  }

  public ngOnDestroy(): void {
    this.newsListSub.unsubscribe();
  }
}
