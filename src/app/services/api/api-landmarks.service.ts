import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GetLandmarksResponse } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Utilities } from '@app/common/utilities';
import { Landmark } from '@app/models/landmark.model';
import { CustomHttpUrlEncodingCodec } from '@app/common/api-encoder';

@Injectable({
  providedIn: 'root'
})
export class ApiLandmarksService {
  constructor(private httpClient: HttpClient){}

  public getLandmarks(order?: string, objectProperties?: string): Observable<GetLandmarksResponse> {
    let requestParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    // let requestHeaders = new HttpHeaders();

    if (Utilities.isDefined(order)) {
      requestParameters = requestParameters.set('order', order);
    }
    // requestHeaders = requestHeaders.set('Accept', 'application/json; charset=UTF-8');
    // requestHeaders = requestHeaders.set('X-Parse-Application-Id', 'landMarksAppId');


    return this.httpClient.get<GetLandmarksResponse>(
      `${environment.landmarksServerBaseUrl}/classes/Landmark`,
      {
        params: requestParameters,
        /* headers: requestHeaders, */
        observe: 'body',
        reportProgress: false
      }
    );
  }

  public getLandmark(objectId: string, objectProperties?: string): Observable<Landmark> {
    let requestHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.set('Accept', 'application/json; charset=UTF-8');
    return this.httpClient.get<Landmark>(
      `${environment.landmarksServerBaseUrl}/classes/Landmark/${objectId}`,
      {
        headers: requestHeaders,
        observe: 'body',
        reportProgress: false
      }
    );
  }
}
