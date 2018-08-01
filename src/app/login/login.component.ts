import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';
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

  // registrationForm: FormGroup;
  loginForm: FormGroup;
  // registrationDescription: string;
  loginDescription: string;
  email: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl( [

  ]);

  matcher = new MyErrorStateMatcher();



  loginCredentials: TokenPayload = {
    email: '',
    password: ''
  };



  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<LoginComponent>
  ) {

    iconRegistry.addSvgIcon(
      'ic_close',
      sanitizer.bypassSecurityTrustResourceUrl('assets/img/ic_close_white_24px.svg'));

    this.loginDescription = 'Login';

    this.loginForm = fb.group({
      emailFormControl: [ this.email, Validators.required],
      category: ['some category', Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: ['some long desc', Validators.required]
    });

  }

  ngOnInit() {

  }



  login() {
    this.auth.login(this.loginCredentials).subscribe(() => {
      this.dialogRef.close(this.loginForm.value);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  close() {
    this.dialogRef.close();
  }



}


