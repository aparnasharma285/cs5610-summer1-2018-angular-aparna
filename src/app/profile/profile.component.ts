import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";
import {CourseServiceClient} from "../services/course.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private courseService: CourseServiceClient,
              private router: Router) {
  }

  model = new User();
  sections = [];
  courses = [];
  courseIds = [];
  isAdmin = false;

  update(model) {
    this.service.updateProfile(model).then(response => {
        alert("Profile updated successfully");
      });
  }

  logout() {
    this.service
      .logout()
      .then(() =>
        this.router.navigate(['login']));

  }


  goBackHome() {
    this.router.navigate(['home']);
  }

  ngOnInit() {
    this.service
      .profile()
      .then(user => {
        this.model.username = user.username;
        if ((this.model.username).toUpperCase() === "ADMIN") {
          this.isAdmin = true;
        }
        this.service.findUserById(user._id).then(loggedInUser => {
          this.model.password = loggedInUser.password;
          this.model.firstName = loggedInUser.firstName;
          this.model.lastName = loggedInUser.lastName;
          this.model.email = loggedInUser.email;
          this.model.address = loggedInUser.address;
          this.model.phone = loggedInUser.phone;
        });
      }).then(() => this.sectionService.findSectionsForStudent()
      .then(sections => this.sections = sections)
      .then(() => this.sections.map(item => {
        if (!this.courseIds.includes(item.section.courseId, 0)) {
          this.courseIds.push(item.section.courseId);
        }
      })))
      .then(() => this.courseIds.map(courseId => this.courseService.findCourseById(courseId)
        .then(course => this.courses.push(course))))
      .then(() => this.courses.map(course => console.log("course" + course.title)))
      .catch(error => {this.model = new User(); });
  }

}
