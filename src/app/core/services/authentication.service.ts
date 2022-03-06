import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { IAuthenticationRequest, IAuthenticationResponse } from '../contracts/authentication-contract';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private baseUrl : string = environment.apiBaseUrl;

  constructor(private httpClient : HttpClient, private storageService : StorageService) { }

  public authenticateUser(authRequest : IAuthenticationRequest, callbackSuccess : Function, callbackErr : Function) : void {
    this.httpClient
      .post<IAuthenticationResponse>(`${this.baseUrl}/auth`, authRequest)
      .subscribe({
        next: (response : IAuthenticationResponse) => {
          if (response.success) {
            this.storageService.set("accessToken", response?.accessToken);
            callbackSuccess(response.message); //passing success message
          } else {
            throw response.message;
          }
        },
        error: (err : HttpErrorResponse) => {
          callbackErr(err); //passing err message
        }
      });
  }

  public isAuthenticated() : boolean {
    return this.storageService.exists("accessToken") && this.storageService.get("accessToken") != "";
  }

  public logout(callback : Function | null = null) : void {
    if (this.storageService.exists("rememberMeFlag") && Boolean(this.storageService.get("rememberMeFlag")))
      return;

    this.storageService.remove("accessToken");
    
    if (callback != null) 
      callback();
  }

  public destroySession() : void {
    this.storageService.destroy();
  }

}
