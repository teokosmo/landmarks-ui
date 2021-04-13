import { Component, OnInit } from '@angular/core';
import { Constants } from '@app/common/constants';
import { Utilities } from '@app/common/utilities';
import { IGetLandmarksResponse } from '@app/models';
import { ApiLandmarksService } from '@app/services/api';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styleUrls: ['./landmarks.component.css']
})
export class LandmarksComponent implements OnInit {

  constructor(private apiLandmarksService: ApiLandmarksService) { }

  landMarks$: Observable<IGetLandmarksResponse>;

  ngOnInit(): void {
    const orderByField = 'order';
    this.landMarks$ = this.apiLandmarksService.getLandmarks(orderByField);
  }

  trackLandmarks(index, dataItem): void {
    return dataItem ? dataItem.objectId : undefined;
  }

}
