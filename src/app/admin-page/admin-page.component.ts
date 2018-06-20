import {Component, OnInit} from '@angular/core';
import {Course} from "../models/coruse.model.client";
import {CourseServiceClient} from "../services/course.service.client";
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) {
  }

  courses: Course[] = [];
  sections = [];
  selected = '';
  courseid = '';
  courseName = '';

  createCourse() {
    this.courseService.createNewCourse(this.courses.length, this.courseName)
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.courses = courses)
      .then(() => {
        this.courseName = '';
      });
  }

  updateCourse() {
    this.courseService.updateCourse(this.courseid, this.courseName)
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.courses = courses)
      .then(() => {
        this.courseid = '';
        this.courseName = '';
      });
  }

  goBackHome() {
    this.router.navigate(['home']);
  }

  getSections(courseId) {
    this.sectionService.findSectionsForCourse(courseId).then(sections => this.sections = sections);
  }

  ngOnInit() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
