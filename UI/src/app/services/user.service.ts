import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { UserClaim } from '../models/user-claim.model';
import { UserCredential } from '../models/user-credential.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url = environment.apiBaseUrl + '/user/';
  errorMessage = 'User is not authorize';
  loginEvent = new Subject<boolean>();

  login(): Observable<boolean> {
    return this.loginEvent.asObservable();
  }

  constructor(
    private httpclient: HttpClient,
    private _router: Router,
  ) {}

  userAuthenticate(userCredential: UserCredential) {
    const localURL = this.url + 'authenticateasync';
    return this.httpclient.post<UserClaim>(localURL, userCredential);
  }

  userLogout() {
    localStorage.removeItem('userClaims');
    this._router.navigate(['/userLogin']);
  }
}
