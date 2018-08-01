import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';
import { SharedService }              from './shared.service';
import { LoginComponent }             from './login/login.component';
import { MatDialog, MatDialogConfig } from '@angular/material';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SharedService ]
})

export class AppComponent implements OnInit {

  constructor ( private dialog: MatDialog, private _router: Router, private sharedService: SharedService ) {}

  ngOnInit() {}

  onKeyUp( searchTerm ) {
    console.log('1. App Component. Trying to search for ' + searchTerm );
    this._router.navigate([ 'search' ]);
    this.sharedService.searchFor( searchTerm );
  }

  openDialog( description, longDescription, category ) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.height = '400px';
    dialogConfig.width = '600px';

    dialogConfig.data = {
      id: 1,
      title: 'Angular For Beginners',
      description, longDescription, category
    };


    const dialogRef = this.dialog.open( LoginComponent, dialogConfig) ;

    dialogRef.afterClosed().subscribe(
      data => console.log( 'Dialog output:' , data)
    );

  }

}
