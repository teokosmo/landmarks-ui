import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IGetLandmarksResponse, IUploadLandmarkPhotoResponse } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { Utilities } from '@app/common/utilities';
import { ILandmarkObject } from '@app/models/landmark.model';
import { CustomHttpUrlEncodingCodec } from '@app/common/api-encoder';
import { IGetLandmarksRequestParams, ILandmarkUpdate, ILandmarkUpdateResponse, LandmarkUpdate } from '@app/models/api-landmarks.model';

@Injectable({
  providedIn: 'root'
})
export class ApiLandmarksService {
  constructor(private httpClient: HttpClient){}

  public getLandmarks(requestParams?: IGetLandmarksRequestParams, objectProperties?: string): Observable<IGetLandmarksResponse> {
    let requestParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    // let requestHeaders = new HttpHeaders();

    if (Utilities.isDefined(requestParams)) {
      Object.keys(requestParams).forEach(requestParamKey => {
        requestParameters = requestParameters.set(requestParamKey, requestParams[requestParamKey]);
      });
    }
    // requestHeaders = requestHeaders.set('Accept', 'application/json; charset=UTF-8');
    // requestHeaders = requestHeaders.set('X-Parse-Application-Id', 'landMarksAppId');


    return this.httpClient.get<IGetLandmarksResponse>(
      `${environment.landmarksServerBaseUrl}/classes/Landmark`,
      {
        params: requestParameters,
        /* headers: requestHeaders, */
        observe: 'body',
        reportProgress: false
      }
    );
  }

  public getLandmark(objectId: string, requestParams?: IGetLandmarksRequestParams, objectProperties?: string): Observable<ILandmarkObject> {
    let requestParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    if (Utilities.isDefined(requestParams)) {
      Object.keys(requestParams).forEach(requestParamKey => {
        requestParameters = requestParameters.set(requestParamKey, requestParams[requestParamKey]);
      });
    }
    return this.httpClient.get<ILandmarkObject>(
      `${environment.landmarksServerBaseUrl}/classes/Landmark/${objectId}`,
      {
        params: requestParameters,
        observe: 'body',
        reportProgress: false
      }
    );
  }

  public updateLandmark(objectId: string, landmarkUpdateSubmitData: LandmarkUpdate): Observable<ILandmarkUpdateResponse> {
    return this.httpClient.put<ILandmarkUpdateResponse>(
      `${environment.landmarksServerBaseUrl}/classes/Landmark/${objectId}`,
      landmarkUpdateSubmitData,
      {
        observe: 'body',
        reportProgress: false
      }
    );
  }

  public uploadLandmark(photo: File): Observable<IUploadLandmarkPhotoResponse> {
    let requestHeaders = new HttpHeaders();
    requestHeaders = requestHeaders.set('Content-Type', photo.type);

    return this.httpClient.post<IUploadLandmarkPhotoResponse>(
      `${environment.landmarksServerBaseUrl}/files/${photo.name}`,
      photo,
      {
        headers: requestHeaders,
        observe: 'body',
        reportProgress: false
      }
    );
  }
}
