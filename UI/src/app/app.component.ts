import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {
  title = 'Tender Management System';
  currentItem = 'Television';
  isLogin = false;
  count = 0;
  loginSubscription: Subscription;
  
  constructor(private _userService : UserService) {
    this.loginSubscription = this._userService.login().subscribe( (x) => { this.isLogin = x; console.log(x)} );
  }
}