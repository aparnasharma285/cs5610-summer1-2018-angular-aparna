import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGridComponent } from './course-grid.component';

describe('CourseGridComponent', () => {
  let component: CourseGridComponent;
  let fixture: ComponentFixture<CourseGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
