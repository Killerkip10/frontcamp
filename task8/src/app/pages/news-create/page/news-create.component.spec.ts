import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { INews, NEWS_TYPE } from 'src/app/core';
import { SharedModule } from 'src/app/shared';
import { PATH } from 'src/app/configs/path';

import { NewsCreateComponent } from './news-create.component';
import { NewsCreateService } from './news-create.service';

describe('NewsCreateComponent', () => {
  let component: NewsCreateComponent;
  let fixture: ComponentFixture<NewsCreateComponent>;
  let mockedNewsCreateService;
  let mockedRouter;

  beforeEach(async(() => {
    mockedNewsCreateService = {
      createNewsRequest: jasmine.createSpy().and.returnValue(of(null)),
    };
    mockedRouter = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [NewsCreateComponent],
      providers: [
        { provide: NewsCreateService, useValue: mockedNewsCreateService },
        { provide: Router, useValue: mockedRouter },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onNewsSave should call createNewsRequest', () => {
    const news: INews = {
      id: 1,
      type: NEWS_TYPE.LOCAL,
      authorId: '2',
      title: 'title-1',
      description: 'description-1',
    };

    component.onNewsSave(news);

    expect(mockedNewsCreateService.createNewsRequest).toHaveBeenCalledWith(news);
    expect(mockedRouter.navigate).toHaveBeenCalledWith([PATH.NEWS_LIST]);
  });
});
