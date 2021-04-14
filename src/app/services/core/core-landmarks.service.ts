import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
   LandmarkObject,
   ILandmarkObject,
   ILandmarksCache,
   IGetLandmarksResponse,
   IGetLandmarksRequestParams,
   LandmarkUpdate,
   IRequestResult,
   RequestResults
} from '@app/models';
import { ApiLandmarksService } from '../api/api-landmarks.service';
import { Utilities } from '@app/common/utilities';
import { Constants } from '@app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class CoreLandmarksService {
  landmarksCache: ILandmarksCache;
  landmarksSubject: BehaviorSubject<ILandmarkObject[]>;
  landmarkSubject: BehaviorSubject<ILandmarkObject>;
  landmarkUpdateSubject: Subject<IRequestResult>;

  constructor(private apiLandmarksService: ApiLandmarksService){
    this.landmarksCache = {};
    this.landmarksSubject = new BehaviorSubject<ILandmarkObject[]>([]);
    this.landmarkSubject = new BehaviorSubject<ILandmarkObject>(null);
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
              this.landmarksCache[landmark.objectId] = new LandmarkObject(landmark);
            });
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
          this.landmarksCache[landmark.objectId] = new LandmarkObject(landmark, true);
          this.landmarkSubject.next(this.landmarksCache[landmark.objectId]);
        },
        (err) => {
          Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
        }
      );
  }

  updateLandmark(objectId: string, landmarkData: LandmarkUpdate): void {
    this.apiLandmarksService.updateLandmark(objectId, landmarkData)
      .subscribe(
        (updateResponse: any) => {
          Object.assign(this.landmarksCache[objectId], landmarkData);
          this.landmarkUpdateSubject.next({
            result: RequestResults.SUCCESS
          });
        },
        (err) => {
          Utilities.logMsg(`${err.message}`, Constants.logLevel.error);
          this.landmarkUpdateSubject.next({
            result: RequestResults.ERROR,
            message: err.error.error
          });
        }
      );
  }

  getListOfLandmarks(): void {
    if (Utilities.isObjectEmpty(this.landmarksCache)) {
      this.requestLandmarks();
    } else {
      this.landmarksSubject.next(this.getLandmarksInArray());
    }
  }

  getLandmark(objectId: string): void{
    if (this.landmarksCache[objectId] && this.landmarksCache[objectId].allKeysRetrieved) {
      this.landmarkSubject.next(this.landmarksCache[objectId]);
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
    const landmarks: LandmarkObject[] = [];
    Object.keys(this.landmarksCache).forEach(landmark => {
      landmarks.push(this.landmarksCache[landmark]);
    });
    landmarks.sort(Utilities.sortObjectOnProperty('order'));
    return landmarks;
  }
}
