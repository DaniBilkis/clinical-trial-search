import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

import {HttpClient} from '@angular/common/http';


@Injectable()
export class SharedService {

  searchResults$ = Observable.of<any[]>([]);
  private searchTerms = new Subject<string>();
  searchTerms$ = this.searchTerms.asObservable();
  // public searchTerms: Observable<string>; // = new Subject<string>();

  /*
  private messageSource = new BehaviorSubject<string>(undefined );
  private fetching: boolean;
  currentMessage$ = this.messageSource.asObservable();

  isDef = function(a) {
    return void 0 !== a;
  };

  private getData() {
    return this.searchResults$;
  }

  awaitData() {
    if ( !this.isDef(this.messageSource.getValue()) && !this.fetching ) {
      this.populateSearchResults3();
    }
    return this.searchResults$;
  }

  populateSearchResults3() {
    console.log( 'Inside Shared Service - populateSearchResults3 method. Trying to search for ...' );
    this.fetching = true;
    this.searchResults$ = this.currentMessage$
      .debounceTime(300)         // wait for 300ms pause in events
      .distinctUntilChanged()    // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.search(term)
        // or the observable of empty results if no search term
        : Observable.of<any[]>([]))
      .catch(error => {
        // TODO: real error handling
        this.fetching = false;
        console.log(`Error in component ... ${error}`);
        return Observable.of<any[]>([]);
      });
    this.fetching = false;
    console.log( 'Inside Shared Service - leaving populateSearchResults3 method...' );
  }

  populateSearchResults2() {
    this.searchResults$ = this.currentMessage$.pipe(
      // console.log( '2. Inside Search Component - ngOnInit' ),
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.search(term)),
    );
  }


  refresh() {
    this.fetching = true;
    Net.fetch().then(data => {
      this.fetching = false;
      this.data1.next(data);
    },err => {
      this.fetching = false;
      this.data1.error(err);
    });
  }
*/

  constructor( private http: HttpClient ) {}



  searchFor( searchTerm: string ) {
    console.log( 'Inside Search Service - searchFor. Trying to search for ' + searchTerm );
    if ( searchTerm !== '' ) {
      this.searchTerms.next(searchTerm);
    }
    // this.messageSource.next( searchTerm );
  }
/*
  searchForNew( searchTerm: string ) {
    console.log( 'Inside Search Service - searchForNew. Trying to search for ' + searchTerm );
    this.messageSource.next( searchTerm );
    // this.messageSource.next( searchTerm );
  }
*/
}
