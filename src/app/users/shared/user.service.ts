import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IUserRegistrationRequest, IUserRegistrationResponse } from './user-contract';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  private baseUrl : string = environment.apiBaseUrl;

  public registerUser(request : IUserRegistrationRequest) : Observable<IUserRegistrationResponse> | null {

    if (!request.email || !request.password || !request.username) return null;

    return this.httpClient.post<IUserRegistrationResponse>(`${this.baseUrl}/users`, request);
  }

}
