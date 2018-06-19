import { Component, OnInit } from '@angular/core';
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
              private courseService: CourseServiceClient) { }

  sections = [];
  courseIds = [];
  courses = [];

  ngOnInit() {
    this.sectionService.findSectionsForStudent()
      .then(sections => this.sections = sections)
      .then(() => this.sections.map(item => {
        if (!this.courseIds.includes(item.section.courseId, 0)) {
        this.courseIds.push(item.section.courseId); } }))
      .then(() => this.courseIds.map(courseId => {
        this.courseService.findCourseById(courseId)
        .then(course => this.courses.push(course)); }));
  }

}
