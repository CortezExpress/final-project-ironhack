import { Component, OnInit } from '@angular/core';

import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";


@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  signUpInfo = {
    username: "",
    password: ""
  };

  errorMessage: string;

  constructor(private myAuthService: AuthService, private myRouter: Router) {}

  ngOnInit() {}

  doSignUp() {
    this.myAuthService
      .signup(this.signUpInfo)
      .then(resultFromApi => {
        // clear form
        this.signUpInfo = { username: "", password: "" };

        // clear error message
        this.errorMessage = "";

        // redirect to /meats
        // can i redirect to anywhere? i want to redirect to a home page - how?
        this.myRouter.navigate(["/meats"]);
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } // close doSignUp()
}
