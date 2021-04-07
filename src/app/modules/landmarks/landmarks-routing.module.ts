import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandmarksComponent } from './components/landmarks/landmarks.component';
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component';

const routes: Routes = [
  { path: 'landmark/:objectId', component: LandmarkDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandmarksRoutingModule { }
