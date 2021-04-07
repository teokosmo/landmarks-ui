import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandmarksRoutingModule } from './landmarks-routing.module';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component';


@NgModule({
  declarations: [LandmarksComponent, LandmarkDetailsComponent],
  imports: [
    CommonModule,
    LandmarksRoutingModule
  ]
})
export class LandmarksModule { }
