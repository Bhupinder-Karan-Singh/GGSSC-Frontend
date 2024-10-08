import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './folder/home/home.component';
import { AdminComponent } from './folder/admin/admin.component';
import { RegistrationComponent } from './folder/registration/registration.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'/home'
  },
  {
    path: 'home',
    component:HomeComponent,
  },
  {
    path: 'admin',
    component:AdminComponent,
  },
  {
    path: 'registration',
    component:RegistrationComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, enableTracing: true  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
