import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { INews, NEWS_TYPE } from 'src/app/core';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewsListComponent {
  @Input() public newsList: INews[] = [];
  @Output() public newsDelete = new EventEmitter<number>();
  @Output() public newsDetails = new EventEmitter<[number, number]>();
  @Output() public newsEdit = new EventEmitter<number>();

  public NEWS_TYPE = NEWS_TYPE;

  public onNewsDeleteClick(id: number): void {
    this.newsDelete.emit(id);
  }

  public onNewsDetailsClick(id: number, typeId: number): void {
    this.newsDetails.emit([id, typeId]);
  }

  public onNewsEditClick(id: number): void {
    this.newsEdit.emit(id);
  }
}
