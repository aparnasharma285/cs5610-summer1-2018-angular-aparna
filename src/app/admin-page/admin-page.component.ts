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
  blank_courseId = '';
  blank_courseName = '';
  blank_sectionId = '';
  blank_sectionName = '';
  blank_sectionSeat: number;
  currentCourseId = '';
  isAdmin = false;
  previousAvailableSeats: number;
  previousMaxSeats: number;

  createCourse() {
    this.courseService.createNewCourse(this.courses.length, this.blank_courseName)
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.courses = courses)
      .then(() => {
        this.blank_courseName = '';
      });
  }

  updateCourse() {
    this.courseService.updateCourse(this.blank_courseId, this.blank_courseName)
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.courses = courses)
      .then(() => {
        this.blank_courseId = '';
        this.blank_courseName = '';
      });
  }

  goBackHome() {
    this.router.navigate(['home']);
  }

  getSections(courseId) {
    this.currentCourseId = courseId;
    this.sectionService.findSectionsForCourse(courseId).then(sections => this.sections = sections);
  }

  updateCurrentCourse(courseId, courseTitle) {
    this.blank_courseId = courseId;
    this.blank_courseName = courseTitle;
  }

  updateSectionCall(sectionId, sectionName, sectionMaxSeats, sectionAvailableSeats) {
    this.blank_sectionName = sectionName;
    this.blank_sectionId = sectionId;
    this.blank_sectionSeat = sectionMaxSeats;
    this.previousAvailableSeats = sectionAvailableSeats;
    this.previousMaxSeats = sectionMaxSeats;
  }

  deleteCourse(courseId) {
    this.courseService.deleteCourse(courseId)
      .then(() => this.courseService.findAllCourses())
      .then(courses => this.courses = courses);
  }

  createNewSection() {
    this.sectionService.createSection(this.currentCourseId, this.blank_sectionName, this.blank_sectionSeat)
      .then(() => this.sectionService.findSectionsForCourse(this.currentCourseId))
      .then(sections => this.sections = sections)
      .then(() => {
        this.blank_sectionName = '';
        this.blank_sectionSeat = 0;
      });
  }

  updateSection() {
    this.sectionService.updateSection(this.currentCourseId, this.blank_sectionId,
      this.blank_sectionName, (this.blank_sectionSeat - (this.previousMaxSeats - this.previousAvailableSeats)), this.blank_sectionSeat)
      .then(() => this.sectionService.findSectionsForCourse(this.currentCourseId))
      .then(sections => this.sections = sections)
      .then(() => {
        this.blank_sectionId = '';
        this.blank_sectionName = '';
        this.blank_sectionSeat = 0;
        this.previousAvailableSeats = 0;
        this.previousMaxSeats = 0;
      });
  }


  deleteSection(sectionId) {
    this.sectionService.deleteSection(this.currentCourseId, sectionId)
      .then(() => this.sectionService.findSectionsForCourse(this.currentCourseId))
      .then(sections => this.sections = sections);
  }

  ngOnInit() {
    this.service.profile()
      .then(user => {
        if ((user.username).toUpperCase() === "ADMIN") {
          this.isAdmin = true;
        }
      }).then(() => {
      if (this.isAdmin) {
        this.courseService.findAllCourses()
          .then(courses => this.courses = courses);
      }
    });
  }
}
