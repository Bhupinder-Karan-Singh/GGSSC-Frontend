import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  public isLoading = false
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Admin Login', url: '/admin', icon: 'person' },
    // { title: 'Registration', url: '/registration', icon: 'document' },
  ];
  constructor(
    private toastController: ToastController
  ) { }

  public isLoggedIn(){
    let token = localStorage.getItem("idToken")
    if(token==undefined || token==null || token==''){
      return false;
    }else{
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
