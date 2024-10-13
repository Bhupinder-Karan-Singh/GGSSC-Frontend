import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { CanActivate, Router, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Observable } from 'rxjs';
import { AppServiceService } from './app-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  userData: Observable<firebase.User | null>;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router, 
    private http: HttpClient,
    public appService: AppServiceService) {
      this.userData = angularFireAuth.authState;
      this.userData.subscribe( userInfo => {
        this.saveIdToken(userInfo!);
      });
     }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth['signInWithEmailAndPassword'](email, password).then((res: any) => {
        localStorage.setItem('email', email);
        this.saveIdToken(res.user);
        this.appService.appPages[1] = { title: 'Admin Home', url: '/admin-home', icon: 'person'}
        this.router.navigate(['/admin-home'])
      })
      .catch((err) => {
        const errorMessage = err.message.replace(/.*Firebase:\s/, '').trim();
        this.appService.presentToast('top',errorMessage)
      });
  }

  SignOut() {
    this.angularFireAuth['signOut']();
    localStorage.clear();
    localStorage.removeItem('user_email');
    localStorage.removeItem('idToken');
    this.appService.appPages[1] = { title: 'Admin Login', url: '/admin', icon: 'person'}
    this.router.navigate(['/admin'])
  } 

  saveIdToken(firebaseUser: firebase.User){
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
       user.getIdToken().then(function(idTokenValue) {
        if(idTokenValue){
              localStorage.setItem('idToken', idTokenValue);
            }else{
             console.log("No idToken")
            }
        });
      }
     });
   }
}
