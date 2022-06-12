import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tender } from 'src/app/models/tender.model';
import { TenderService } from 'src/app/services/tender.service';


@Component({
  selector: 'app-list-tender',
  templateUrl: './list-tender.component.html'
})
export class ListTenderComponent implements OnInit {

  errorMessage: string = "Loading data, please wait...";
  tenderList!: Tender[];

  constructor(private _tenderService : TenderService, private _router: Router) { }

  ngOnInit(): void {
    this.getTenderList();
  }

  errorHandler(error: Error) {
    this.errorMessage = error.message;
    console.log(this.errorMessage);
  }

  getTenderList():void{
    this._tenderService.getTenderList().subscribe(
      x => { this.tenderList = <Tender[]> x.data }, 
      error => { 
        console.log(error);
        this.errorMessage = 'Cannot connect to the server, please try again later'; 
        if (error.status = 401)
        {
          alert('Your login has been expired');
          localStorage.removeItem('userClaims');
        }
        this._router.navigate(['/home']); 
      });
  }

  deleteTender(tender:Tender):void{
    if (confirm("Are you sure ?"))
    {
      this._tenderService.deleteTender(tender).subscribe( x => {this.getTenderList()} , error => { this.errorMessage = error.message; console.log(error)});
    }
  }
}
