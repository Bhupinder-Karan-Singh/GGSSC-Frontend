import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CreateEventComponent } from './pages/create-event/create-event.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { EditEventsComponent } from './pages/edit-events/edit-events.component';

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
    path: 'register',
    component:RegistrationComponent,
  },
  // {
  //   path: 'registration',
  //   component:RegistrationComponent,
  // },
  {
    path: 'admin-home',
    component:AdminHomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-event',
    component:CreateEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'create-event/:formPayloadId',
    component:CreateEventComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'edit-events',
    component:EditEventsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'logout',
    component:LogoutComponent,
    canActivate: [AuthGuardService]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules, 
      useHash: true, 
      enableTracing: true,
      onSameUrlNavigation: 'reload'  })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
