import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';

import { INews } from 'src/app/core';
import { PATH } from 'src/app/configs/path';

import { NewsEditService } from './news-edit.service';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
})
export class NewsEditComponent implements OnInit {
  public newsDetails$: Subject<INews>;

  constructor(
    private newsEditService: NewsEditService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    this.newsEditService.getNewsByIdRequest(id).subscribe();

    this.newsDetails$ = this.newsEditService.getNewsDetailsSubject;
  }

  public onNewsSave(editedNews: INews): void {
    const { id } = this.activatedRoute.snapshot.params;

    this.newsEditService.editNewsRequest(id, editedNews)
      .subscribe(() => this.router.navigate([PATH.NEWS_LIST]));
  }
}
