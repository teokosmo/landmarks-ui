import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomHttpUrlEncodingCodec } from '@app/common/api-encoder';
import { GetLoginResponse } from '@app/models';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiUserService {
  constructor(private httpClient: HttpClient){}

  public login(username: string, password: string): Observable<GetLoginResponse> {
    let requestParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
    requestParameters = requestParameters.set('username', username);
    requestParameters = requestParameters.set('password', password);

    return this.httpClient.get<GetLoginResponse>(
      `${environment.landmarksServerBaseUrl}/login`,
      {
        params: requestParameters,
        /* headers: requestHeaders, */
        observe: 'body',
        reportProgress: false
      }
    );
  }

  public logout(): Observable<{}> {
    return this.httpClient.post<{}> (
      `${environment.landmarksServerBaseUrl}/logout`,
      {
        observe: 'body',
        reportProgress: false
      }
    );
  }
}
