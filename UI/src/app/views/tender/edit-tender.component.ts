import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { Tender } from 'src/app/models/tender.model';
import { UserClaim } from 'src/app/models/user-claim.model';
import { TenderIdPipe } from 'src/app/pipes/tender-id.pipe';
import { TenderService } from 'src/app/services/tender.service';

@Component({
  selector: 'app-edit-tender',
  templateUrl: './edit-tender.component.html',
  styles: [
  ]
})
export class EditTenderComponent implements OnInit {

  messageResponse = 'Success';
  errorMessage = 'Cannot connect to the server, please try again later';
  releaseDate!: Date;

  datePickerConfigReleaseDate! : Partial<BsDatepickerConfig>;
  datePickerConfigClosingDate! : Partial<BsDatepickerConfig>;

  constructor(private _fb: FormBuilder, private _tenderService : TenderService, private _router: Router, private _activatedRoute: ActivatedRoute) { 
  }

  tenderForm!: FormGroup;
  tender!:Tender;
  countTouch = 0;

  ngOnInit(): void {

    this.buildFormGroup();

    this.getFormData();

    this.setDefaultValues();

    this.monitoringCalendar();
  }
  createdBy!:string;
  createdDate!:Date;

  getFormData(): void{
    this._tenderService.getTenderById(this._activatedRoute.snapshot.params['id']).subscribe(
      x => { this.tender = <Tender> x.data; this.setFormValues(); }, 
      error => 
      { 
        console.log(error);
        this.errorMessage = 'Cannot connect to the server, please try again later'; 
        if (error.status = 401)
        {
          alert('Your login has been expired');
          localStorage.removeItem('userClaims');
        }
        this._router.navigate(['/home']); 
      },
      () => { /* do nothing */  } );
  }

  buildFormGroup(): void {
      this.tenderForm = this._fb.group(
        {
          id:[''],
          tenderID:[{value: '', disabled: true }],
          contractNo:[ '', Validators.required],
          tenderName:[ '', Validators.required],
          tenderValue:[ '', Validators.required],
          description:[ '', Validators.required],
          releaseDate:[ '', Validators.required],
          closingDate:[ '', Validators.required],
          createdBy:[{value:'', disabled:true}],
          createdDate:[{value:'', disabled:true}],
          modifiedBy:[{value:'', disabled:true}],
          modifiedDate:[{value:'', disabled:true}],
        }
      ); 
  }

  setFormValues():void {
    const idPipe = new TenderIdPipe();
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

  monitoringCalendar():void{
    this.tenderForm.get('releaseDate')?.valueChanges.subscribe(x => {
      this.datePickerConfigClosingDate = Object.assign({}, {
        containerClass: 'theme-dark-blue',
        minDate: new Date (x.setDate(x.getDate() + 1)),
        dateInputFormat: 'DD-MMM-YYYY',
        showWeekNumbers:false
      });
      if (x <= new Date()) {
        this.tenderForm.controls['releaseDate'].setValue(new Date (new Date().setDate(new Date().getDate() + 1)));       
      }
      if (this.tenderForm.get('closingDate')?.value <= x) 
      {
        this.tenderForm.get('closingDate')?.setValue(new Date (x.setDate(x.getDate())));
      } 
    });
  }

  updateClosingDate(){
    const dateRelease : Date =  this.tenderForm.get('releaseDate')?.value;
    const dateClosing : Date = this.tenderForm.get('closingDate')?.value;
    if (dateClosing <= dateRelease) {
      //this.tenderForm.controls['closingDate'].setValue(new Date(dateRelease.setDate(dateRelease.getDate() + 1)));    
      this.tenderForm.controls['closingDate'].setValue(new Date(dateRelease));   
    }
  } 

  onSubmit()
  {
    //this.assignFormControl(this.tenderForm);
    const tender:Tender = {
      id :this.tenderForm.get('id')?.value,
      tenderID:this.tenderForm.get('tenderID')?.value,
      contractNo:this.tenderForm.get('contractNo')?.value,
      tenderName:this.tenderForm.get('tenderName')?.value,
      tenderValue:this.tenderForm.get('tenderValue')?.value,
      description:this.tenderForm.get('description')?.value,
      releaseDate:this.tenderForm.get('releaseDate')?.value,
      closingDate:this.tenderForm.get('closingDate')?.value,    
      createdBy:this.tenderForm.get('createdBy')?.value,
      createdDate:this.tender.createdDate,
      modifiedBy:(<UserClaim>JSON.parse(localStorage.getItem("userClaims") || '')).userName,
      modifiedDate: new Date(),
    }

    this._tenderService.updateTender(tender).subscribe(
      () => { alert(this.messageResponse); this._router.navigate(['/tenderList']) }, 
      error => { alert(this.errorMessage); console.log(error) },
      () => { alert('Redirect to the list ... ')} );
    
  }
}
