import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import * as moment from 'moment';

/*
 * @title Dialog Overview
 */
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})


export class LoginComponent implements OnInit {


  form: FormGroup;
  description: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<LoginComponent> ){

    this.description = 'some description';


    this.form = fb.group({
      description: [ this.description, Validators.required],
      category: ['some category', Validators.required],
      releasedAt: [moment(), Validators.required],
      longDescription: ['some long desc', Validators.required]
    });

  }

  ngOnInit() {

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}


