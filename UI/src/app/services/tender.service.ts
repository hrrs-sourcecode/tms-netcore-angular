import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestBase } from 'src/app/models/request-base.model';
import { ResponseBase } from 'src/app/models/response-base.model';
import { Tender } from 'src/app/models/tender.model';
import { Observable } from 'rxjs';
import { UserClaim } from '../models/user-claim.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TenderService {
  url = environment.apiBaseUrl + '/tender/';
  userToken = '';

  constructor(
    private httpclient: HttpClient,
    private _router: Router,
    private _userService: UserService,
  ) {
    if (localStorage.getItem('userClaims') != null) {
      this._userService.loginEvent.next(true);
      this.userToken = (<UserClaim>JSON.parse(localStorage.getItem('userClaims') || '')).token;
    } else {
      this._userService.loginEvent.next(false);
      this._router.navigate(['/userLogin']);
    }
  }

  request: RequestBase = new RequestBase();
  response: ResponseBase = new ResponseBase();

  // Get all
  getTenderList(): Observable<ResponseBase> {
    const localURL = this.url + 'getalltenderlistasync';
    return this.executeRequest(null, localURL);
  }

  // Get by id
  getTenderById(id: number): Observable<ResponseBase> {
    const localURL = this.url + 'gettenderbyidasync';
    return this.executeRequest(id, localURL);
  }

  // Create
  createTender(tender: Tender): Observable<ResponseBase> {
    const localURL = this.url + 'createtenderasync';
    this.request.data = tender;
    return this.executeRequest(this.request, localURL);
  }

  // Update
  updateTender(tender: Tender): Observable<ResponseBase> {
    const localURL = this.url + 'updatetenderasync';
    this.request.data = tender;
    return this.executeRequest(this.request, localURL);
  }

  // Delete
  deleteTender(tender: Tender): Observable<ResponseBase> {
    const localURL = this.url + 'deletetenderasync';
    this.request.data = tender;
    return this.executeRequest(this.request, localURL);
  }

  createHttpHeaderRequest(): HttpHeaders {
    return new HttpHeaders()
      .set('Content-Type', 'application/json; charset=utf-8')
      .set('Authorization', 'Bearer ' + this.userToken);
  }

  executeRequest(requestData: any, requestUrl: string): Observable<ResponseBase> {
    const headers = this.createHttpHeaderRequest();
    return this.httpclient.post<ResponseBase>(requestUrl, requestData, { headers });
  }
}
