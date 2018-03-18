import { BrowserModule }           from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }             from '@angular/forms';
import { HttpClientModule }        from '@angular/common/http';
import { NgModule }                from '@angular/core';
import { MaterialModule }          from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import { AppComponent }            from './app.component';
import { AppRoutingModule }        from './app-routing.module';
import { SearchResultComponent }   from './search-result/search-result.component';
import { LoginComponent }          from './login/login.component';
import { AboutComponent } from './about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    SearchResultComponent,
    LoginComponent,
    AboutComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
