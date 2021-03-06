import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { NEWS_TYPE, INews } from 'src/app/core';
import { PATH } from 'src/app/configs/path';

import { NewsDetailsService } from './news-details.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
})
export class NewsDetailsComponent implements OnInit {
  public isFetching$: Subject<boolean>;
  public newsDetails$: Subject<INews>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private newsDetailsService: NewsDetailsService,
  ) { }

  public ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;
    const type = Number(this.activatedRoute.snapshot.params.type);

    if (type === NEWS_TYPE.LOCAL) {
      this.newsDetailsService.getNewsLocalByIdRequest(id).subscribe();
    } else {
      this.newsDetailsService.getNewsExternalByIdRequest(id).subscribe();
    }

    this.isFetching$ = this.newsDetailsService.getIsFetchingSubject;
    this.newsDetails$ = this.newsDetailsService.getNewsDetailsSubject;
  }

  public onBackClick(): void {
    this.router.navigate([PATH.NEWS_LIST]);
  }
}
