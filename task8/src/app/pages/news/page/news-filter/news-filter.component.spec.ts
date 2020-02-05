import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFilterComponent } from './news-filter.component';

describe('NewsFilterComponent', () => {
  let component: NewsFilterComponent;
  let fixture: ComponentFixture<NewsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFilterComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('onNewsTypeChange should emit newsTypeChange', () => {
    const event = { target: { value: '10' } };
    const expectedResult = Number(event.target.value);

    component.newsTypeChange
      .subscribe(data => expect(data).toEqual(expectedResult));

    component.onNewsTypeChange(event);
  });

  it('onNewsTitleChange should emit newsTitleChange', () => {
    const event = { target: { value: '10' } };
    const expectedResult = event.target.value;

    component.newsTitleChange
      .subscribe(data => expect(data).toEqual(expectedResult));

    component.onNewsTitleChange(event);
  });

  it('onCreateByMeChange should emit createdByMeChange', () => {
    const event = { target: { checked: true } };
    const expectedResult = event.target.checked;

    component.createdByMeChange
      .subscribe(data => expect(data).toEqual(expectedResult));

    component.onCreateByMeChange(event);
  });
});
