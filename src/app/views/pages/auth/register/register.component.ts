import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from '../services/auth.service';
import { LocalstorageService } from '../services/localstorage.service';
import { _User } from './user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  passwordVisible: boolean = false
  registerFormGroup!: FormGroup;
  isSubmitted: boolean = false;
  authError: boolean = false;
  authMessage: string = 'Email or Password are wrong';
  private _user: _User = new _User;

  constructor(
    private _formBuilder: FormBuilder,
    private _auth: AuthService,
    private _toast: HotToastService,
    private _router: Router,

  ) { }
  initRegisterForm() {
    this.registerFormGroup = this._formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: ['', [Validators.pattern('[0-9]{11}')]],
      gender: [''],
      country: ['', Validators.required],
      area: ['', Validators.required],
      street: ['', Validators.required],
    });
  }
  onSubmit() {

    if (this.registerFormGroup.invalid) return;

    this.assignValueToUser(
      this.registerForm.email.value,
      this.registerForm.firstName.value,
      this.registerForm.lastName.value,
      this.registerForm.gender.value,
      this.registerForm.password.value,
      this.registerForm.phone.value,
      this.registerForm.area.value,
      '',
      this.registerForm.country.value
      ,
      'null',
      'null'
    );
    this._auth.register(this._user).pipe(
      this._toast.observe(
        {
          loading: 'Logging in...',
          success: 'Congrats! You are registered',
          error: ({ error }) => `There was an error: ${error.message} `
        }
      ),
    ).subscribe(
      (user) => {
        this.authError = false;
        this._router.navigate(['/auth']);
      },
      (error: HttpErrorResponse) => {
        console.log(error)
        this.authError = true;
        if (error.status !== 400) {
          this.authMessage = error.message;
        }
      }
    );
  }
  assignValueToUser(email: string, firstName: string, lastName: string, gender: string, password: string, phone: string, area: string, buildNo: string, country: string, floorNo: string, street: string) {
    this._user.email = email;
    this._user.firstName = firstName;
    this._user.lastName = lastName;
    this._user.gender = gender;
    this._user.password = password;
    this._user.phone = phone;
    this._user.address.area = area;
    this._user.address.buildNo = buildNo;
    this._user.address.country = country;
    this._user.address.floorNo = floorNo;
    this._user.address.street = street;
  }
  get registerForm() {
    return this.registerFormGroup.controls;
  }
  /*
    ----------------------------------------
    ========== visibility Toggle ===========
    ----------------------------------------
  */
  visibilityToggle() {
    if (this.passwordVisible == false) {
      this.passwordVisible = true
    }
    else {
      this.passwordVisible = false
    }
  }
  ngOnInit(): void {
    this.initRegisterForm()
  }
}
