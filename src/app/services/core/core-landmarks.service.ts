import { Injectable } from '@angular/core';
import { Constants } from '@app/common/constants';
import { Utilities } from '@app/common/utilities';
import {
  IGetLandmarksRequestParams,
  IGetLandmarksResponse,
  ILandmarkObject,
  ILandmarkUpdateResponse,
  IRequestResult,
  LandmarkCache,
  LandmarkObject,
  LandmarkUpdate,
  RequestResults,
} from '@app/models';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ApiLandmarksService } from '../api/api-landmarks.service';
import { merge } from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class CoreLandmarksService {
  landmarksCache: LandmarkCache;
  landmarksSubject: BehaviorSubject<ILandmarkObject[]>;
  landmarkSubject: Subject<ILandmarkObject>;
  landmarkUpdateSubject: Subject<IRequestResult>;
  private _cacheValidTimePeriod = 10 * 60 * 1000; // 10 mins in milliseconds
  private _cacheLastUpdateTimestamp = null;

  constructor(private apiLandmarksService: ApiLandmarksService){
    this.landmarksCache = new Map();
    this.landmarksSubject = new BehaviorSubject<ILandmarkObject[]>([]);
    this.landmarkSubject = new Subject<ILandmarkObject>();
    this.landmarkUpdateSubject = new Subject<IRequestResult>();
  }

  requestLandmarks(): void {
    const requestParams: IGetLandmarksRequestParams = {
      order: 'order',
      excludeKeys: 'description,photo,location,url'
    };
    this.apiLandmarksService.getLandmarks(requestParams)
      .subscribe(
        (landmarksResponse: IGetLandmarksResponse) => {
          if (landmarksResponse.results) {
            landmarksResponse.results.forEach(landmark => {
              this.landmarksCache.set(landmark.objectId, new LandmarkObject(landmark));
            });
            this._cacheLastUpdateTimestamp = Date.now();
            this.landmarksSubject.next(this.getLandmarksInArray());
          }
        },
        (err) => {
          Utilities.logMsg(`${err.message}`,
           Constants.logLevel.error);
        }
      );
  }

  requestLandmark(objectId: string): void {
    this.apiLandmarksService.getLandmark(objectId)
      .subscribe(
        (landmark: ILandmarkObject) => {
          const newLandmark = new LandmarkObject(landmark, true);
          this.landmarksCache.set(landmark.objectId, newLandmark);
          this.landmarkSubject.next(newLandmark);
        },
        (err) => {
          Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
        }
      );
  }

  updateLandmark(objectId: string, landmarkData: LandmarkUpdate): void {
    this.apiLandmarksService.updateLandmark(objectId, landmarkData)
      .subscribe(
        (updateResponse: ILandmarkUpdateResponse) => {
          const updatedLandmark = merge(this.landmarksCache.get(objectId), landmarkData, updateResponse);
          this.landmarksCache.set(objectId, updatedLandmark);
          this.landmarkUpdateSubject.next({
            result: RequestResults.SUCCESS
          });
        },
        (err) => {
          Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
          this.landmarkUpdateSubject.next({
            result: RequestResults.ERROR,
            message: err.error.error || err.message
          });
        }
      );
  }

  getListOfLandmarks(): void {
    if (this.hasLandmarksCacheExpired()) {
      this.requestLandmarks();
    } else {
      this.landmarksSubject.next(this.getLandmarksInArray());
    }
  }

  getLandmark(objectId: string): void{
    const landmark = this.landmarksCache.get(objectId);
    if (Utilities.isDefined(landmark) && landmark.allKeysRetrieved) {
      this.landmarkSubject.next(landmark);
    } else {
      this.requestLandmark(objectId);
    }
  }

  getLandmarksObservable(): Observable<ILandmarkObject[]> {
    return this.landmarksSubject.asObservable();
  }

  getLandmarkObservable(): Observable<ILandmarkObject> {
    return this.landmarkSubject.asObservable();
  }

  getLandmarksInArray(): LandmarkObject[] {
    return Array.from(this.landmarksCache.values());
  }

  hasLandmarksCacheExpired(): boolean {
    let cacheHasExpired = true;
    if (Utilities.isDefined(this._cacheLastUpdateTimestamp)) {
      cacheHasExpired = (Date.now() - this._cacheLastUpdateTimestamp) > this._cacheValidTimePeriod;
      if (cacheHasExpired) {
        Utilities.logMsg(`CoreLandmarksService.hasLandmarksCacheExpired: Cache has expired`);
      }
    }
    return cacheHasExpired;
  }
}
