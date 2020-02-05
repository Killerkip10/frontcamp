import { of } from 'rxjs';

import { NEWS_TYPE, INews } from 'src/app/core';

import { NewsService } from './news.service';

describe('NewsService', () => {
  let newsService: NewsService;
  let mockedHttpService;
  let mockedAuthenticationService;
  let mockedNewsList: INews[];

  beforeEach(() => {
    mockedHttpService = {};
    mockedAuthenticationService = {};

    mockedNewsList = [
      {
        id: 1,
        type: NEWS_TYPE.LOCAL,
        authorId: '1',
        title: 'title-1',
        description: 'description-1',
      },
      {
        id: 2,
        type: NEWS_TYPE.EXTERNAL,
        authorId: '2',
        title: 'title-2',
        description: 'description-2',
      }
    ];

    newsService = new NewsService(mockedHttpService, mockedAuthenticationService);
  });

  it('getNewsListSubject should return newsList$', () => {
    expect(newsService.getNewsListSubject).toBe((newsService as any).newsList$);
  });

  it('getIsFetchingSubject should return isFetching$', () => {
    expect(newsService.getIsFetchingSubject).toBe((newsService as any).isFetching$);
  });

  it('getQuery should return query', () => {
    expect(newsService.getQuery).toBe((newsService as any).query);
  });

  it('getNewsList should set default values', () => {
    const expectedResult = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 10,
    };

    (newsService as any).query = expectedResult;

    newsService.getNewsList();

    expect((newsService as any).query).toEqual(expectedResult);
  });

  it('getNewsList should set value typeId', () => {
    const typeId = NEWS_TYPE.ALL;
    const query = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 10,
    };
    const expectedResult = {
      ...query,
      typeId,
    };

    (newsService as any).query = expectedResult;

    newsService.getNewsList({ typeId });

    expect((newsService as any).query).toEqual(expectedResult);
  });

  it('getNewsList should set value title', () => {
    const title = 'title-1';
    const query = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 10,
    };
    const expectedResult = {
      ...query,
      title,
    };

    (newsService as any).query = expectedResult;

    newsService.getNewsList({ title });

    expect((newsService as any).query).toEqual(expectedResult);
  });

  it('getNewsList should set value createdByMe', () => {
    const createdByMe = false;
    const query = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 10,
    };
    const expectedResult = {
      ...query,
      createdByMe,
    };

    (newsService as any).query = expectedResult;
    newsService.getNewsList({ createdByMe });

    expect((newsService as any).query).toEqual(expectedResult);
  });
  it('getNewsList should set value top', () => {
    const top = 15;
    const query = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 10,
    };
    const expectedResult = {
      ...query,
      top,
    };

    (newsService as any).query = expectedResult;
    newsService.getNewsList({ top });

    expect((newsService as any).query).toEqual(expectedResult);
  });

  it('getNewsList should emit newsList$', () => {
    const query = {
      typeId: NEWS_TYPE.LOCAL,
      title: 'title-1',
      createdByMe: true,
      top: 1,
    };
    const mockedTypeFilter = spyOn(newsService as any, 'typeFilter').and.returnValue(true);
    const mockedTitleFilter = spyOn(newsService as any, 'titleFilter').and.returnValue(true);
    const mockedIsCreatedByMeFilter = spyOn(newsService as any, 'isCreatedByMeFilter').and.returnValue(true);

    (newsService as any).newsList = mockedNewsList;

    newsService.getNewsListSubject.subscribe((newsList: INews[]) => {
      expect(newsList).toEqual(mockedNewsList.slice(0, query.top));
    });

    newsService.getNewsList(query);

    expect(mockedTypeFilter).toHaveBeenCalledWith(mockedNewsList[0].type, query.typeId);
    expect(mockedTitleFilter).toHaveBeenCalledWith(mockedNewsList[0].title, query.title);
    expect(mockedIsCreatedByMeFilter).toHaveBeenCalledWith(query.createdByMe, mockedNewsList[0].authorId);
  });

  it('getAllNewsListRequest should call getNewsListExternal', () => {
    const mockedGetNewsListExternal = spyOn(newsService as any, 'getNewsListExternal').and.returnValue(of());
    const mockedGetNewsListLocal = spyOn(newsService as any, 'getNewsListLocal').and.returnValue(of(mockedNewsList));

    newsService.getAllNewsListRequest()
      .subscribe((newsList) => {
        expect(mockedGetNewsListExternal).toHaveBeenCalled();
        expect(mockedGetNewsListLocal).toHaveBeenCalled();
        expect(newsList).toEqual(mockedNewsList);
      });
  });
});
