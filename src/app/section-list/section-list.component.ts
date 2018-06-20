import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {CourseServiceClient} from "../services/course.service.client";
import {Course} from "../models/coruse.model.client";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

  constructor(private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private userService: UserServiceClient,
              private router: Router,
              private route: ActivatedRoute) {
    this.route.params.subscribe(params => this.loadSections(params['courseId']));
  }

  seats = '';
  courseId = '';
  course = new Course();
  sections = [];
  enrolledSections = [];
  enrolledStatus = false;

  loadSections(courseId) {
    this.courseId = courseId;
    this.sectionService.findSectionsForCourse(courseId)
      .then(sections => this.sections = sections);
  }

  enroll(section) {
    this.sectionService.enrollStudentInSection(section._id)
      .then(() => {
        this.router.navigate(['profile']);
      });
  }

  isEnrolled(sectionId) {
    if (this.enrolledSections !== undefined && this.enrolledSections.length > 0) {
      this.enrolledStatus = false;
      this.enrolledSections.map(item => {
        if (item.section._id === sectionId) {
          this.enrolledStatus = true;
        }
      });
    }

    return this.enrolledStatus;
  }

  isFull(sectionMaxSeats, seactionSeats) {
    if (seactionSeats === 0) {
      return true;
    } else {
      return false;
    }
  }

  unenroll(sectionId) {
    this.sectionService.unenrollStudentInSection(sectionId)
      .then(() => window.location.reload());
  }

  ngOnInit() {
    this.userService.checkLoginStatus()
      .then(isLoggedIn => {
        if (isLoggedIn) {
          this.sectionService.findSectionsForStudent()
            .then(sections => this.enrolledSections = sections);
        }
      });
    this.courseService.findCourseById(this.courseId)
      .then(course => this.course = course);
  }

}
