import { Component, OnInit } from '@angular/core';
import { IGetLandmarksResponse } from '@app/models';
import { IGetLandmarksRequestParams } from '@app/models/api-landmarks.model';
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
    const requestParams: IGetLandmarksRequestParams = {
      order: 'order',
      excludeKeys: 'description,photo,location,url'
    };
    this.landMarks$ = this.apiLandmarksService.getLandmarks(requestParams);
  }

  trackLandmarks(index, dataItem): void {
    return dataItem ? dataItem.objectId : undefined;
  }

}
