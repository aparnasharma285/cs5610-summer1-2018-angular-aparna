import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseNavigatorComponent } from './course-navigator.component';

describe('CourseNavigatorComponent', () => {
  let component: CourseNavigatorComponent;
  let fixture: ComponentFixture<CourseNavigatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseNavigatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
