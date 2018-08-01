import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { AuthenticationService, TokenPayload } from '@app/login/login.service';
import * as moment from 'moment';
import {LoginComponent} from "@app/login/login.component";

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ AuthenticationService ]
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  registrationDescription: string;
  loginDescription: string;

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  passwordFormControl = new FormControl( [

  ]);

  registerCredentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<RegisterComponent>
  ) {

    this.registrationDescription = 'Register';

    this.registrationForm = fb.group({
      description: [ this.registrationDescription, Validators.required],
      category: ['some category', Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: ['some long desc', Validators.required]
    });

  }

  ngOnInit() {
  }

  register() {
    console.log( 'Inside Register Module - register()' );
    this.auth.register(this.registerCredentials).subscribe(() => {
      this.dialogRef.close(this.registrationForm.value);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.dialogRef.close(this.registrationForm.value);
  }

}
