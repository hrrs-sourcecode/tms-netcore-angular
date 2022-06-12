import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClaim } from 'src/app/models/user-claim.model';
import { UserCredential } from 'src/app/models/user-credential.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styles: [
  ]
})
export class UserLoginComponent implements OnInit {

  userForm!: FormGroup;
  errorMessage: string = 'This user is not authorize';

  
  constructor(private _fb: FormBuilder, private _userService : UserService, private _router: Router) { }
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();

  ngOnInit(): void {
    this.buildFormGroup();

    this.setFormValues();
  }

  /*testEvent(xyz:string){
    console.log(xyz);
    this._userService.loginEvent.next(xyz);
  }*/

  buildFormGroup(): void {
    this.userForm = this._fb.group(
      {
        userName:['', Validators.required],
        password:['', Validators.required],
      }
    )
  }

  setFormValues(): void{
    this.userForm.controls['userName'].setValue('Harris');
    this.userForm.controls['password'].setValue('pass');
  } 

  onSubmit()
  {
    let userCredential : UserCredential = {
      userName:this.userForm.get('userName')?.value,
      password:this.userForm.get('password')?.value,
    }

    this._userService.userAuthenticate(userCredential)
    .subscribe(
      x => 
      { 
        localStorage.setItem("userClaims", JSON.stringify(x));
        this._userService.loginEvent.next(true);
        this._router.navigate(['/home']);
      }, 
      error => { alert(this.errorMessage); console.log(error) },
      () => {  } );;   
  }
}
