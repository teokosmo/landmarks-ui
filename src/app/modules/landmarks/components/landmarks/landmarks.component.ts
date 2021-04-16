import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ILandmarkObject } from '@app/models/landmark.model';
import { CoreLandmarksService } from '@app/services/core';
import { interval, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit, AfterViewInit {

  constructor(private coreLandmarksService: CoreLandmarksService) { }

  landMarks$: Observable<ILandmarkObject[]>;
  noLandmarksMessage = '';

  ngOnInit(): void {
    this.landMarks$ = this.coreLandmarksService.landmarksSubject.asObservable();
    this.coreLandmarksService.getListOfLandmarks();
  }

  ngAfterViewInit(): void {
    interval(500)
      .pipe(take(1))
      .subscribe(() => {
        this.noLandmarksMessage = 'No landmarks available!';
      });
  }

  trackLandmarks(index, dataItem): void {
    return dataItem ? dataItem.objectId : undefined;
  }

}
