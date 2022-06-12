import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    console.log("Home has been hit");
    if(localStorage.getItem("userClaims") == null)
    {
      this._router.navigate(['/userLogin']); 
    }
  }

}
