import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {SearchResultComponent}  from './search-result/search-result.component';
import {LoginComponent}         from './login/login.component';
import {AboutComponent}         from './about/about.component';


const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'search', component: SearchResultComponent, data: { title: 'Search Result' } },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'about', component: AboutComponent, pathMatch: 'full' }
//  { path: 'search/:id', component: HeroDetailComponent },
//  { path: 'heroes', component: HeroesComponent }
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
