import {Component, OnInit} from '@angular/core';
import {User} from "../models/user.model.client";
import {UserServiceClient} from "../services/user.service.client";
import {Router} from "@angular/router";
import {SectionServiceClient} from "../services/section.service.client";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private service: UserServiceClient,
              private sectionService: SectionServiceClient,
              private router: Router) {
  }

  model = new User();
  sections = [];

  update(model) {
    alert("Did hit");
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
        this.service.findUserById(user._id).then(loggedInUser => {
          this.model.password = loggedInUser.password;
          this.model.firstName = loggedInUser.firstName;
          this.model.lastName = loggedInUser.lastName;
          this.model.email = loggedInUser.email;
          this.model.address = loggedInUser.address;
          this.model.phone = loggedInUser.phone;
        });
      }).then(() => this.sectionService.findSectionsForStudent()
      .then(sections => this.sections = sections))
      .catch(error => {this.model = new User(); });
  }

}
