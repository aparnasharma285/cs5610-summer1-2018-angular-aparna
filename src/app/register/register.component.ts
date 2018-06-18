import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserServiceClient} from "../services/user.service.client";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router,
              private service: UserServiceClient) {
  }

  username;
  password;
  password2;

  register(username, password, password2) {
    if (username.length > 0 && password.length > 0) {
      if (password === password2) {
        this.service
          .createUser(username, password)
          .then((response) => {
            if (response.error === undefined) {
            this.router.navigate(['profile']);
          } else {
            alert("Username Already exists");
            }
          });
      } else {
        alert("The passwords do not match");
      }
    } else {
      alert("All fields are required");
    }
  }

  ngOnInit() {
  }

}
