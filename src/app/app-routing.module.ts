import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ErrorPageComponent} from './shared/components/error-page/error-page.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {PhotosComponent} from './photos/photos.component';
import {PhotoDetailComponent} from './photo-detail/photo-detail.component';

const routes: Routes = [
  {path: '', component: DashboardComponent, children: [
      {path: '', component: PhotosComponent},
      {path: 'favorites', component: PhotoDetailComponent},
      {path: 'photos/:id', component: PhotoDetailComponent}
   ]
  },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
