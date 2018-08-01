import { NgModule }               from '@angular/core';
import { Routes, RouterModule }   from '@angular/router';

import { SearchResultComponent }  from './search-result/search-result.component';
import { LoginComponent }         from './login/login.component';
import { AboutComponent }         from './about/about.component';
import { PageNotFoundComponent }  from './page-not-found/page-not-found.component';
import { RegisterComponent }      from '@app/register/register.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'search', component: SearchResultComponent },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
