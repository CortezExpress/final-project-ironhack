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

        // redirect to /phones
        this.myRouter.navigate(["/phones"]);
      })
      .catch(err => {
        const parsedError = err.json();
        this.errorMessage = parsedError.message + " 😤";
      });
  } // close doSignUp()
}
