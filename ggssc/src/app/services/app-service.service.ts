import { Injectable } from '@angular/core';
// import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  public isLoading = false

  constructor(
    // private loadingCtrl: LoadingController
  ) { }

  public isLoggedIn(){
    let token = localStorage.getItem("idToken")
    if(token==undefined || token==null || token==''){
      return false;
    }else{
      return true;
    }
  }
}
