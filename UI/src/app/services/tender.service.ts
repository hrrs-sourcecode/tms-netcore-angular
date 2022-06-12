import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { RequestBase } from 'src/app/models/request-base.model';
import { ResponseBase } from 'src/app/models/response-base.model';
import { Tender } from 'src/app/models/tender.model';
import { Observable } from 'rxjs';
import { UserClaim } from '../models/user-claim.model';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable()
export class TenderService {

  url: string = 'https://localhost:44381/api/tender/';
  userToken:string = '';

  constructor(private httpclient : HttpClient, private _router: Router, private _userService:UserService) { 
    console.log(localStorage.getItem("userClaims"));
    if(localStorage.getItem("userClaims")!= null)
    {
      this._userService.loginEvent.next(true);
      this.userToken = (<UserClaim>JSON.parse(localStorage.getItem("userClaims") || '')).token;
    }
    else{
      this._userService.loginEvent.next(false);
      this._router.navigate(['/userLogin']); 
    }
  }

  request: RequestBase = new RequestBase();
  response: ResponseBase = new ResponseBase();

  // Get all
  getTenderList(): Observable<ResponseBase> {
    let localURL = this.url + 'getalltenderlistasync';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userToken);
    return this.httpclient.post<ResponseBase>(localURL,  null, {headers});
  }
  
  // Get by id 
  getTenderById(id:number): Observable<ResponseBase> {
    let localURL = this.url + 'gettenderbyidasync';
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8').set('Authorization', 'Bearer ' + this.userToken);
    return this.httpclient.post<ResponseBase>(localURL, id, { headers });
  }

  // Create 
  createTender(tender: Tender): Observable<ResponseBase> {
    let localURL = this.url + 'createtenderasync';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userToken);
    this.request.data = tender;
    return this.httpclient.post<ResponseBase>(localURL, this.request, {headers});
  }

  // Update
  updateTender(tender: Tender): Observable<ResponseBase> {
    let localURL = this.url + 'updatetenderasync';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userToken);
    this.request.data = tender;
    return this.httpclient.post<ResponseBase>(localURL, this.request, {headers});
  }

  // Delete
  deleteTender(tender: Tender): Observable<ResponseBase> {
    let localURL = this.url + 'deletetenderasync';
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + this.userToken);
    this.request.data = tender;
    return this.httpclient.post<ResponseBase>(localURL, this.request, {headers});
  }
}
