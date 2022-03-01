import { Component, OnInit } from '@angular/core';
import { IAuthenticationRequest } from 'src/app/core/contracts/authentication-contract';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
