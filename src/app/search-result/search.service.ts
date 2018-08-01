import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';


@Injectable()
export class SearchService {

  constructor( private http: HttpClient ) { }


  search( term: string ): Observable<any> {
    console.log( 'Inside SearchService - search method. Trying to search for ' + term );
    return this.http
      .get(`/api/search/${term}`)
      // .subscribe(data => data.body );
      // .subscribe(data => { this.searchResults = data; });
      // .map( res => res.json().results )
       .catch((error: any) => {
        console.error('A friendly error occurred', error);
        return Observable.throwError(error.message || error);
       });
  }

}
