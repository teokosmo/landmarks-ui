import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILandmarkObject } from '@app/models';
import { interval, Observable } from 'rxjs';
import { Utilities } from '@app/common/utilities';
import { CoreLandmarksService } from '@app/services/core';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-landmark-details',
  templateUrl: './landmark-details.component.html',
  styleUrls: ['./landmark-details.component.css']
})
export class LandmarkDetailsComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private coreLandmarksService: CoreLandmarksService) { }

  landmarkObjectId: string;
  landmark$: Observable<ILandmarkObject>;
  utils = Utilities;

  ngOnInit(): void {
    this.landmarkObjectId = this.route.snapshot.paramMap.get('objectId');
    this.landmark$ = this.coreLandmarksService.landmarkSubject.asObservable();
  }

  ngAfterViewInit(): void {
    interval(1)
      .pipe(take(1))
      .subscribe(() => {
        this.coreLandmarksService.getLandmark(this.landmarkObjectId);
      });
  }

}
