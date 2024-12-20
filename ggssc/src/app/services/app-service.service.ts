import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  public loading: any;
  public loadingSubMessage:any
  public isLoading = false
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home', active:true},
    { title: 'Admin Login', url: '/admin', icon: 'person', active:true},
    { title: 'Sign out', url: '/logout', icon: 'exit', active:false},
    // { title: 'Registration', url: '/registration', icon: 'document' },
  ];
  constructor(
    private toastController: ToastController
  ) { }

  public isLoggedIn(){
    let token = localStorage.getItem("idToken")
    if(token==undefined || token==null || token==''){
      this.appPages[2].active = false
      return false;
    }else{
      this.appPages[2].active = true
      return true;
    }
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 5000,
      position: position,
      buttons: [
        {
          icon: 'close',
          htmlAttributes: {
            'aria-label': 'close',
          },
        },
      ],
    });
    await toast.present();
  }
}
