
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { UserClaim } from '../models/user-claim.model';
import { UserCredential } from '../models/user-credential.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'https://localhost:44381/api/user/';
  errorMessage: string = 'User is not authorize';
  loginEvent = new Subject<boolean>();

  login():Observable<boolean>
  {
    return this.loginEvent.asObservable();
  }

  constructor(private httpclient : HttpClient, private _router: Router) {}

  userAuthenticate(userCredential: UserCredential) {
    let localURL = this.url + 'authenticateasync';
    return this.httpclient.post<UserClaim>(localURL, userCredential);
  }

  userLogout(){
    localStorage.removeItem("userClaims");
    this._router.navigate(['/userLogin']); 
  }
}
