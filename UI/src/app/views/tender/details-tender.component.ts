import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Tender } from 'src/app/models/tender.model';
import { TenderIdPipe } from 'src/app/pipes/tender-id.pipe';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-details-tender',
  templateUrl: './details-tender.component.html',
  styles: [
  ]
})
export class DetailsTenderComponent implements OnInit {

  messageResponse: string = 'Success';
  errorMessage: string = 'Cannot connect to the server, please try again later';
  releaseDate!: Date;

  datePickerConfigReleaseDate! : Partial<BsDatepickerConfig>;
  datePickerConfigClosingDate! : Partial<BsDatepickerConfig>;

  constructor(private _fb: FormBuilder, private _tenderService : TenderService, private _router: Router, private _activatedRoute: ActivatedRoute) { 
  }

  tenderForm!: FormGroup;
  tender!:Tender;

  ngOnInit(): void {

    this.buildFormGroup();

    this.getFormData();

    this.setDefaultValues();
  }

  getFormData(): void{
    this._tenderService.getTenderById(this._activatedRoute.snapshot.params['id']).subscribe(
      x => { this.tender = <Tender> x.data; this.setFormValues(); }, 
      error => { 
        console.log(error);
        this.errorMessage = 'Cannot connect to the server, please try again later'; 
        if (error.status = 401)
        {
          alert('Your login has been expired');
          localStorage.removeItem('userClaims');
        }
        this._router.navigate(['/home']); 
      },
      () => {  } );
  }

  buildFormGroup(): void {
    let tender:Tender;
    let idPipe = new TenderIdPipe();
      this.tenderForm = this._fb.group(
        {
          id:[''],
          tenderID:[{value: '', disabled: true }],
          contractNo:[{value:'', disabled:true}],
          tenderName:[{value:'', disabled:true}],
          tenderValue:[{value:'', disabled:true}],
          description:[{value:'', disabled:true}],
          releaseDate:[{value:'', disabled:true}],
          closingDate:[{value:'', disabled:true}],
          createdBy:[{value:'', disabled:true}],
          createdDate:[{value:'', disabled:true}],
          modifiedBy:[{value:'', disabled:true}],
          modifiedDate:[{value:'', disabled:true}],
        }
      ); 
  }

  setFormValues():void {
    let idPipe = new TenderIdPipe();
    this.tenderForm.controls['id'].setValue(this.tender.id);
    this.tenderForm.controls['tenderID'].setValue(idPipe.transform(this.tender.id,7));
    this.tenderForm.controls['contractNo'].setValue(this.tender.contractNo);
    this.tenderForm.controls['tenderName'].setValue(this.tender.tenderName);
    this.tenderForm.controls['tenderValue'].setValue(this.tender.tenderValue);
    this.tenderForm.controls['description'].setValue(this.tender.description);
    this.tenderForm.controls['releaseDate'].setValue(new Date(this.tender.releaseDate));
    this.tenderForm.controls['closingDate'].setValue(new Date(this.tender.closingDate));
    this.tenderForm.controls['createdBy'].setValue(this.tender.createdBy);
    this.tenderForm.controls['createdDate'].setValue(formatDate(this.tender.createdDate!, 'dd-MM-yyyy hh:mm:ss a', 'en-US'));
    this.tenderForm.controls['modifiedBy'].setValue(this.tender.modifiedBy);
    this.tenderForm.controls['modifiedDate'].setValue(formatDate(this.tender.modifiedDate!, 'dd-MM-yyyy hh:mm:ss a', 'en-US'));
  }

  setDefaultValues(): void {
    this.datePickerConfigReleaseDate = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date (new Date().setDate(new Date().getDate() + 1)),
      dateInputFormat: 'DD-MMM-YYYY',
      showWeekNumbers:false
    });

    this.datePickerConfigClosingDate = Object.assign({}, {
      containerClass: 'theme-dark-blue',
      minDate: new Date (new Date().setDate(new Date().getDate() + 2)),
      dateInputFormat: 'DD-MMM-YYYY',
      showWeekNumbers:false
    });
  }
}

