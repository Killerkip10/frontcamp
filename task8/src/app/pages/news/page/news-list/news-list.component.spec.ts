import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { NewsListComponent } from './news-list.component';

describe('NewsListComponent', () => {
  let component: NewsListComponent;
  let fixture: ComponentFixture<NewsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsListComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onNewsDeleteClick should emit newsDelete', () => {
    const expectedResult = 1;

    component.newsDelete.subscribe(data => {
      expect(data).toEqual(expectedResult);
    });

    component.onNewsDeleteClick(expectedResult);
  });

  it('onNewsDetailsClick should emit newsDetails', () => {
    const id = 1;
    const typeId = 2;
    const expectedResult = [id, typeId];

    component.newsDetails.subscribe(data => {
      expect(data).toEqual(expectedResult);
    });

    component.onNewsDetailsClick(id, typeId);
  });

  it('onNewsEditClick should emit newsEdit', () => {
    const expectedResult = 1;

    component.newsEdit.subscribe(data => {
      expect(data).toEqual(expectedResult);
    });

    component.onNewsEditClick(expectedResult);
  });
});
