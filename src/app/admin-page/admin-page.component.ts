import { Component, OnInit } from '@angular/core';
import {Course} from "../models/coruse.model.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  constructor(private courseService: CourseServiceClient) { }

  courses: Course[] = [];
  selected = '';

  ngOnInit() {
    this.courseService.findAllCourses()
      .then(courses => this.courses = courses);
  }

}
