import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IAuthenticationRequest } from 'src/app/core/contracts/authentication-contract';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { HttpErrorResponseHandler } from 'src/app/core/handler/http-response-error-handler';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private authenticationService : AuthenticationService, private httpErrorHandler : HttpErrorResponseHandler) { }

  public loginForm : FormGroup = new FormGroup
  ({
    username : new FormControl("", [
      Validators.required,
      Validators.minLength(1)
    ]),
    password : new FormControl("", [
      Validators.required,
      Validators.minLength(8),
    ])
  });

  ngOnInit(): void {
  }

  public togglePasswordInput() : void {
    var input = document.getElementById("user-password");
    input?.setAttribute("type", `${input?.getAttribute("type") == "text" ? "password" : "text"}`)
  }

  public loginUser() : void {
    const credentials = {
      "username" : this.loginForm.get("username")?.value,
      "password" : this.loginForm.get("password")?.value
    } as IAuthenticationRequest;

    this.authenticationService
      .authenticateUser(credentials, 
      (msg : string) => {
        alert(`Success ${msg}`);
        this.loginForm.reset();
      }, 
      (err : HttpErrorResponse) => {
        alert(this.httpErrorHandler.getErrors(err));
      });

  }

}
