import { MouseEvent } from '@agm/core';
import { MapService } from './services/map.service';
import { Component, OnInit } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { MapData } from './models/MapData';
import { environment } from '../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ErrorhandlingService } from './core-services/errorhandling.service';
import { Observable } from 'rxjs';
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  env = environment;

  title = 'Innovation Hub';
  markers: Array<MapData> = [];
  // google maps zoom level
  zoom = 13;
  // initial center position for the map
  lat = 51.5203005;
  lng = -0.10761;
  data = [];
  url: any;

  constructor(private mapService: MapService,
              private httpClient: HttpClient,
              private errorHandlingService: ErrorhandlingService,
              private notifier: NotifierService) {

  }

  ngOnInit(): void {
    this.mapService.getMapData().subscribe((res: any) => {
      this.url = res.mapDataURL;
      this.getMapData(this.url);
    });
  }

  private getMapData(url: string) {
    this.httpClient.get(url)
      .subscribe((res: Array<MapData>) => {
        res.forEach(element => {
          this.markers.push(element);
        });
      });
  }

  public showNotification(type: string, message: string): void {
    this.notifier.notify(type, message);
  }

  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClicked($event: MouseEvent) {
    this.markers.push({
      lat: $event.coords.lat,
      lng: $event.coords.lng
    });
  }
}
