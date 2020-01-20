import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { INews } from 'src/app/core';
import { PATH } from 'src/app/configs/path';

import { NewsService, IQuery } from './news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
})
export class NewsComponent implements OnInit {
  public isFetching$: Subject<boolean>;
  public newsList$: Subject<INews[]>;

  constructor(
    private newsListService: NewsService,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.isFetching$ = this.newsListService.getIsFetchingSubject;
    this.newsList$ = this.newsListService.getNewsListSubject;

    this.newsListService.getAllNewsListRequest()
      .subscribe(() => this.newsListService.getNewsList());
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

  public onNewsDetails([id, typeId]: [number, number]): void {
    this.router.navigate([PATH.NEWS_DETAILS, id, typeId]);
  }

  public onNewsEdit(id: number): void {
    this.router.navigate([PATH.NEWS_EDIT, id]);
  }

  public onLoadMoreClick(): void {
    const { top }: IQuery = this.newsListService.getQuery;

    this.newsListService.getNewsList({ top: top + 5 });
  }
}
