import { Component } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { UserService } from '../user.service';
import * as DG from '2gis-maps';

@Component({
  selector: 'app-twogis-map',
  template: `
    <div class="mapControl">
      <div class="zoomControls">
        <button class="plus" (click)="zoomIn()">+</button>
        <button class="minus" (click)="zoomOut()">-</button>
      </div>
      <div class="markerControls">
        <button class="save" (click)="saveMarkers()">Save markers</button>
        <button class="show" (click)="showMarkers()">Show markes</button>
      </div>
    </div>
    <div id="map"></div>
  `,
  styleUrls: ['twogis-map.component.css']
})
export class TwogisMapComponent {

  private map:any;
  private markers:Array<any> = [];

  constructor(private user: UserService, private http: Http) {
    let that = this;
    DG.then(function () {
      that.map = DG.map('map', 
      {
        center: [46.469391, 30.740883],
        zoom: 13,
        zoomControl: false
      });

      that.map.locate({setView: true, watch: true})
        .on('locationfound', function(e) {
          DG.marker([e.latitude, e.longitude]).addTo(that.map);
          that.markers.push([e.latitude, e.longitude]);
        })
        .on('locationerror', function(e) {
          DG.popup()
          .setLatLng(that.map.getCenter())
          .setContent('Доступ к определению местоположения отключён')
          .openOn(that.map);
        })
        .on('click', function(e) {
          DG.marker([e.latlng.lat, e.latlng.lng]).addTo(that.map);
          that.markers.push([e.latlng.lat, e.latlng.lng]);
        });
    });
  }

  zoomIn():void {
    let map = this.map;
    let zoom = map.getZoom();
    if(zoom < map.getMaxZoom()) map.setZoom(++zoom);
    else alert('Its max zoom');
    console.log('Zoom in: ' + zoom);
  }

  zoomOut():void {
    let map = this.map;
    let zoom = map.getZoom();
    if(zoom > 1) map.setZoom(--zoom);
    else alert('Its min zoom');
    console.log('Zoom out: ' + zoom);
  }

  saveMarkers() {
    let map = this.map;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var params = new URLSearchParams();
    params.set("markers", JSON.stringify(this.markers));
    params.set("id", this.user.getUserID());

    this.postMarkers(params, headers).subscribe(
      (result) => {
        alert('Markers saved');
      }
    );
  }

  postMarkers(params, headers) {
    return this.http
      .put('http://localhost:8000/save', params.toString(), { headers })
      .map(res => res.json())
      .map((res) => {
          if(res.success) {
              console.log('send');
          }
          return res.success;
      }
    );
  }

  getMarkers(id) {
    return this.http
    .get('http://localhost:8000/markers/' + id)
      .map(res => res.json())
      .map((res) => {
          let markers = JSON.parse(res.markers);
          for(var i = 0; i < markers.length; i++)
          {
            DG.marker([markers[i][0], markers[i][1]]).addTo(this.map);
          }
      }
    );
  }

  showMarkers():void {
    let map = this.map;
    let id = this.user.getUserID();

    this.getMarkers(id).subscribe(
      (result) => {
        alert('Loaded');
      }
    );
  }

}
