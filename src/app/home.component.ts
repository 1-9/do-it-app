import { Component, Injectable, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { TwogisMapComponent } from './twogis-map/twogis-map.component';

@Injectable()

@Component({
  selector: 'home-page',
  template: `<app-twogis-map></app-twogis-map>`,
  styles: []
})

export class HomePageComponent implements OnInit {


  constructor(private http: Http) {}

  ngOnInit() {
  }
  
  getContent() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    let authToken = localStorage.getItem('auth_token');
    headers.append('Authorization', `Bearer ${authToken}`);

    return this.http
      .get('/login', {headers})
      .map(res => res.json());
  }

}
