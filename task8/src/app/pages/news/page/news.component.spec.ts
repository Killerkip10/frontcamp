import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Router } from '@angular/router';

import { SharedModule } from 'src/app/shared';
import { PATH } from 'src/app/configs/path';

import { NewsComponent } from './news.component';
import { NewsService } from './news.service';
import { NewsFilterComponent } from './news-filter';
import { NewsListComponent } from './news-list';

describe('NewsComponent', () => {
  let component: NewsComponent;
  let fixture: ComponentFixture<NewsComponent>;

  let mockedNewsListService;
  let mockedRouter;

  beforeEach(async(() => {
    mockedNewsListService = {
      getIsFetchingSubject: null,
      getNewsListSubject: null,
      getQuery: null,
      getNewsList: jasmine.createSpy(),
      getAllNewsListRequest: jasmine.createSpy().and.returnValue(({ subscribe: cb => cb() })),
      deleteNewsRequest: jasmine.createSpy().and.returnValue(({ subscribe: () => {} })),
    };

    mockedRouter = {
      navigate: jasmine.createSpy(),
    };

    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        NewsComponent,
        NewsFilterComponent,
        NewsListComponent,
      ],
      providers: [
        { provide: NewsService, useValue: mockedNewsListService },
        { provide: Router, useValue: mockedRouter },
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ngOnInit should call getAllNewsListRequest and getNewsList', () => {
    component.ngOnInit();

    expect(mockedNewsListService.getAllNewsListRequest).toHaveBeenCalled();
    expect(mockedNewsListService.getNewsList).toHaveBeenCalled();
  });

  it('onNewsTypeChange should call getNewsList({ typeId })', () => {
    const typeId = 1;
    const expectedResult = { typeId };

    component.onNewsTypeChange(typeId);

    expect(mockedNewsListService.getNewsList).toHaveBeenCalledWith(expectedResult);
  });

  it('onNewsTitleChange should call getNewsList({ title })', () => {
    const title = 'title-1';
    const expectedResult = { title };

    component.onNewsTitleChange(title);

    expect(mockedNewsListService.getNewsList).toHaveBeenCalledWith(expectedResult);
  });

  it('onCreatedByMeChange should call getNewsList({ createdByMe })', () => {
    const createdByMe = true;
    const expectedResult = { createdByMe };

    component.onCreatedByMeChange(createdByMe);

    expect(mockedNewsListService.getNewsList).toHaveBeenCalledWith(expectedResult);
  });

  it('onNewsDelete should call deleteNewsRequest(id)', () => {
    const id = 1;

    component.onNewsDelete(id);

    expect(mockedNewsListService.deleteNewsRequest).toHaveBeenCalledWith(id);
  });

  it('onNewsDetails should call router.navigate([PATH.NEWS_DETAILS, id, typeId])', () => {
    const id = 1;
    const typeId = 2;
    const expectedResult = [PATH.NEWS_DETAILS, id, typeId];

    component.onNewsDetails([id, typeId]);

    expect(mockedRouter.navigate).toHaveBeenCalledWith(expectedResult);
  });

  it('onNewsEdit should call router.navigate([PATH.NEWS_EDIT, id])', () => {
    const id = 1;
    const expectedResult = [PATH.NEWS_EDIT, id];

    component.onNewsEdit(id);

    expect(mockedRouter.navigate).toHaveBeenCalledWith(expectedResult);
  });

  it('onLoadMoreClick should call getNewsList({ top: top + 5 })', () => {
    const top = 10;
    const expectedResult = { top: top + 5 };

    (component as any).newsListService.getQuery = { top };

    component.onLoadMoreClick();

    expect(mockedNewsListService.getNewsList).toHaveBeenCalledWith(expectedResult);
  });
});
