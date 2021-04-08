import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandmarksRoutingModule } from './landmarks-routing.module';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  declarations: [LandmarksComponent, LandmarkDetailsComponent],
  imports: [
    CommonModule,
    LandmarksRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAxUsvOZIxk8Tnm9UsbLJvU8on1aXZsRho'
    })
  ]
})
export class LandmarksModule { }
