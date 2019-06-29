import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MapData } from '../models/MapData';
import { ErrorhandlingService } from '../core-services/errorhandling.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class MapService {
  config: any;
  mapDataURL: any;
  mapData: Observable<Array<MapData>>;
  public mapDataSubject = new Subject();

  getMapData() {
    return this.httpClient.get('../asssssets/url.config.json').pipe(
      catchError(err => {
        this.errorHandlingService.error();
        return Observable.throw('No response from urldata ' + err);
      }));

    // .pipe(
    //   map((response: any) => {
    //     this.mapDataURL = response.mapDataURL;
    //     this.httpClient.get(this.mapDataURL).subscribe(res => {
    //       this.mapDataSubject.next(res);
    //     });
    //   })),
    //   catchError(error => {
    //     this.errorHandlingService.error();
    //     return Observable.throw('No response from urldata ' + error);
    //   });
  }

  constructor(private httpClient: HttpClient,
              private errorHandlingService: ErrorhandlingService) { }
}
