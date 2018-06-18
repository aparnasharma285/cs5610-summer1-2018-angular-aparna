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
  model= new User();
  sections = [];

  update(model) {
    this.service.updateProfile(model).then(user => {
      if (user !== undefined) {
      this.model.username = user.username;
      this.model.password = user.password;
      this.model.firstName = user.firstName;
      this.model.lastName = user.lastName;
      this.model.email = user.email;
      this.model.address = user.address;
      this.model.phone = user.phone;
      alert("Profile updated successfully");
    }else {
        alert("Updation was unsuccessful");
      }
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
      });

    this.sectionService
      .findSectionsForStudent()
      .then(sections => this.sections = sections);
  }

}
