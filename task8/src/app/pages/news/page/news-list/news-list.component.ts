import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { INews } from 'src/app/core';

import { NEWS_TYPE } from '../constants';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  @Input() public newsList: INews[] = [];
  @Output() public newsDelete = new EventEmitter<number>();

  public NEWS_TYPE = NEWS_TYPE;

  public onNewsDelete(id: number): void {
    this.newsDelete.emit(id);
  }
}
