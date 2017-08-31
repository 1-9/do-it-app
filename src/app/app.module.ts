import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { LoggedInGuard } from './loggedIn.guard';

import {Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from './home.component';
import { LoginPageComponent } from './login.component';
import { AboutPageComponent } from './about.component';
import { NotFoundPageComponent } from './notFound.component';
import { TwogisMapComponent } from './twogis-map/twogis-map.component';

export const appRoutes: Routes = [
  { path: '', component: HomePageComponent, pathMatch: 'full', canActivate: [LoggedInGuard] }, 
  { path: 'login', component: LoginPageComponent }, 
  { path: 'about', component: AboutPageComponent }, 
  { path: '**', component: NotFoundPageComponent } 
];

@NgModule({
  declarations: [
    AppComponent, 
    HomePageComponent, 
    LoginPageComponent, 
    AboutPageComponent, 
    NotFoundPageComponent, TwogisMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
