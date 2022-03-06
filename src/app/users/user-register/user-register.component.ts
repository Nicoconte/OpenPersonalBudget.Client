import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponseHandler } from 'src/app/core/handler/http-error-response-handler';
import { IUserRegistrationRequest } from '../shared/user-contract';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {

  constructor(private userService : UserService, private httpErrorHandler : HttpErrorResponseHandler) { }

  public registerForm : FormGroup = new FormGroup({
    username : new FormControl("", [
      Validators.required
    ]),
    email : new FormControl("", [
      Validators.required,
      Validators.email
    ]),
    password : new FormControl("", [
      Validators.required,
      Validators.minLength(8)
    ])
  });

  ngOnInit(): void {
  }

  public togglePasswordInput() : void {
    var input = document.getElementById("user-password");
    input?.setAttribute("type", `${input?.getAttribute("type") == "text" ? "password" : "text"}`)
  }

  public register() : void {
    
    const request = {
      username : this.registerForm.get('username')?.value,
      email : this.registerForm.get('email')?.value,
      password : this.registerForm.get('password')?.value
    } as IUserRegistrationRequest;

    this.userService
      .registerUser(request)
      ?.subscribe({
        next: (response) => {
          if (response.success) {
            alert(response.message);
          }
        },
        error: (err) => {
          alert(this.httpErrorHandler.getErrors(err));
        }
      });
  }

}
