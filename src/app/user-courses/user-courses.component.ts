import {Component, OnInit} from '@angular/core';
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-user-courses',
  templateUrl: './user-courses.component.html',
  styleUrls: ['./user-courses.component.css']
})
export class UserCoursesComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient) {
  }

  sections = [];
  courseIds = [];
  courses = [];
  allcourses = [];
  availableCourses = [];
  isLoggedIn = false;

  ngOnInit() {
    this.service.checkLoginStatus().then(loginStatus => {
      this.isLoggedIn = loginStatus;
    })
      .then(() => {
    if (this.isLoggedIn) {
    this.sectionService.findSectionsForStudent()
      .then(sections => this.sections = sections)
      .then(() => this.sections.map(item => {
        if (!this.courseIds.includes(item.section.courseId, 0)) {
          this.courseIds.push(item.section.courseId);
        }
      }))
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.allcourses = courses)
      .then(() => this.allcourses.map(course => {
        if (this.courseIds.includes(course.id, 0)) {
          this.courses.push(course);
        }}))
      .then(() => {this.allcourses.map(course => {
        if (!this.courseIds.includes(course.id, 0)) {
          this.availableCourses.push(course);
        }
      }); }); }});

  }
}
