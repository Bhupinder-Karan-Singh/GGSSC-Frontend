import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HomeComponent } from './pages/home/home.component';
import { AdminComponent } from './pages/admin/admin.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { AuthServiceService } from './services/auth-service.service';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AdminHomeComponent } from './pages/admin-home/admin-home.component';
import { CreateEventComponent } from './pages/create-event/create-event.component'; 
import { LogoutComponent } from './pages/logout/logout.component';
import { ImageUploadComponent } from './pages/image-upload/image-upload.component';
import { CandidateImageUploadComponent } from './pages/candidate-image-upload/candidate-image-upload.component';
import { MatTableModule } from '@angular/material/table';
import { EditEventsComponent } from './pages/edit-events/edit-events.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoadingComponent } from './pages/loading/loading.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { EditCandidateComponent } from './pages/edit-candidate/edit-candidate.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CandidateListComponent } from './pages/candidate-list/candidate-list.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { DialogBoxComponent } from './pages/dialog-box/dialog-box.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    RegistrationComponent,
    AdminHomeComponent,
    CreateEventComponent,
    LogoutComponent,
    ImageUploadComponent,
    EditEventsComponent,
    EditCandidateComponent,
    LoadingComponent,
    CandidateImageUploadComponent,
    CandidateListComponent,
    ResetPasswordComponent,
    DialogBoxComponent
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    IonicModule.forRoot( ), 
    AppRoutingModule,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      preventDuplicates: true,
      positionClass: 'toast-top-center',
      closeButton: true,
      }),
      AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    MatTableModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSelectModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
