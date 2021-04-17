import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LandmarksComponent } from './modules/landmarks/components/landmarks/landmarks.component';

const routes: Routes = [
  { path: '', component: LandmarksComponent, },
  { path: 'login', loadChildren: () => import('./modules/user/user.module').then(m => m.UserModule) },
  // { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
