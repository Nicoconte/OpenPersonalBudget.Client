import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
        next: (response) => {
          if (response.success) {
            this.storageService.set("accessToken", response?.accessToken);
            callbackSuccess(response.message); //passing success message
          }
        },
        error: (err) => {
          callbackErr(err); //passing err message
        }
      });
  }

  public isAuthenticated() : boolean {
    return this.storageService.exists("accessToken") && this.storageService.get("accessToken") != null;
  }

  public logout(callback : Function | null = null) : void {
    this.storageService.remove("accessToken");
    
    if (callback != null) 
      callback(); 
  }

  public destroySession() : void {
    this.storageService.destroy();
  }

}
