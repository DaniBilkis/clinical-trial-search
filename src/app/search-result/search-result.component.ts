import { Component, OnInit}         from '@angular/core';

// react
import { Observable }               from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

// important component
import { SharedService }             from '@app/shared.service';
import { SearchService }             from './search.service';



@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css'],
  providers: [ SearchService ]
})

export class SearchResultComponent implements OnInit {

  searchResults$: Observable<any[]>;

  showSpinner = false;
  resultsReady = false;

  populateSearchResults() {
    this.showSpinner = true;
    this.searchResults$ = this.sharedService.searchTerms$
      .debounceTime(300)         // wait for 300ms pause in events
      .distinctUntilChanged()    // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.searchService.search(term)
        // or the observable of empty results if no search term
        : Observable.of<any[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        this.showSpinner = false;
        return Observable.of<any[]>([]);
      });
    this.showSpinner = false;
    this.resultsReady = true;

  }


  constructor( private searchService: SearchService, private sharedService: SharedService ) {}


  ngOnInit(): void {

    this.populateSearchResults();

  }


}
