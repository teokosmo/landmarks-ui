import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '@app/modules/general/not-found/not-found.component';
import { LandmarkEditComponent } from './components/landmark-edit/landmark-edit.component';
import { LandmarkDetailsComponent } from './components/landmark-details/landmark-details.component';
import { CanActivateRouteGuard } from '@app/guards/can-activate-route.guard';

const routes: Routes = [
  { path: 'landmark/:objectId', component: LandmarkDetailsComponent},
  { path: 'landmark/:objectId/edit', canActivate: [CanActivateRouteGuard], component: LandmarkEditComponent},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandmarksRoutingModule { }
