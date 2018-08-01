import { BrowserModule }                                from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }             from '@angular/forms';
import { HttpClientModule }                             from '@angular/common/http';
import { NgModule }                                     from '@angular/core';
import { MaterialModule }                               from './material.module';
import { BrowserAnimationsModule }                      from '@angular/platform-browser/animations';
import { FlexLayoutModule }                             from '@angular/flex-layout';


// import { ChartsModule }                                 from 'ng2-charts';


import { AppComponent }                                 from './app.component';
import { AppRoutingModule }                             from './app-routing.module';
import { SearchResultComponent }                        from './search-result/search-result.component';
import { SharedService }                                from './shared.service';
import { LoginComponent }                               from './login/login.component';
import { AboutComponent }                               from './about/about.component';
import { StatisticsWidgetComponent }                    from './statistics-widget/statistics-widget.component';
import { PageNotFoundComponent }                        from './page-not-found/page-not-found.component';
import { RegisterComponent }                            from './register/register.component';





@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    LoginComponent,
    AboutComponent,
    StatisticsWidgetComponent,
    PageNotFoundComponent,
    RegisterComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: [ SharedService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
