import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthenticationService, TokenPayload } from './login.service';
import * as moment from 'moment';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

/*
 * @title Dialog Overview
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [ AuthenticationService ]
})


export class LoginComponent implements OnInit {

  registrationForm: FormGroup;
  loginForm: FormGroup;
  registrationDescription: string;
  loginDescription: string;
  email: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl( [

  ]);

  
  matcher = new MyErrorStateMatcher();
  registerCredentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  loginCredentials: TokenPayload = {
    email: '',
    password: ''
  };



  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {

    this.registrationDescription = 'Register';
    this.loginDescription = 'Login';

    this.registrationForm = fb.group({
      description: [ this.registrationDescription, Validators.required],
      category: ['some category', Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: ['some long desc', Validators.required]
    });

    this.loginForm = fb.group({
      emailFormControl: [ this.email, Validators.required],
      category: ['some category', Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: ['some long desc', Validators.required]
    });

  }

  ngOnInit() {

  }

  register() {
    this.auth.register(this.registerCredentials).subscribe(() => {
      this.dialogRef.close(this.registrationForm.value);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  login() {
    this.auth.login(this.loginCredentials).subscribe(() => {
      this.dialogRef.close(this.loginForm.value);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  save() {
    this.dialogRef.close(this.registrationForm.value);
  }

  close() {
    this.dialogRef.close();
  }
}


