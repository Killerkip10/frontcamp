import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { INews } from 'src/app/core';

import { NewsService } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit, OnDestroy {
  public newsList: INews[] = [];

  private newsListSub: Subscription;

  constructor(
    private newsListService: NewsService,
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

  public onNewsTypeChange(typeId: number): void {
    this.newsListService.getNewsList({ typeId });
  }

  public onNewsTitleChange(title: string): void {
    this.newsListService.getNewsList({ title });
  }

  public onCreatedByMeChange(createdByMe: boolean): void {
    this.newsListService.getNewsList({ createdByMe });
  }

  public onNewsDelete(id: number): void {
    this.newsListService.deleteNewsRequest(id).subscribe();
  }
}
