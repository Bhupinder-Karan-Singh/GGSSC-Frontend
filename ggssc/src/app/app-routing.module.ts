import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AuthGuardService } from './services/auth-guard.service';

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
  {
    path: 'admin-home',
    component:AdminHomeComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, useHash: true, enableTracing: true  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
