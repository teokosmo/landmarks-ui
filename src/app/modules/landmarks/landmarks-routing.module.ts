import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@app/modules/general/not-found/not-found.component';
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component';

const routes: Routes = [
  { path: 'landmark/:objectId', component: LandmarkDetailsComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandmarksRoutingModule { }
