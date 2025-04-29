import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent implements OnInit {
  isExpanded = false;

  @Input() userClaimsIsNotNull!:boolean;

  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  constructor(private _userService: UserService) {
    /* do nothing */
   }

  ngOnInit(): void {
    /* do nothing */
  }

  logout():void {
    this._userService.loginEvent.next(false);
    console.log(this.userClaimsIsNotNull);
    this._userService.userLogout();
  }
}
