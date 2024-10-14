import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, ViewWillEnter } from '@ionic/angular';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit, ViewWillEnter {
  public title!: string;
  public page!: string;
  email!: string;
  password!: string;
  cpassword!:string;
  success!:boolean;
  name!: string;

  constructor(
    public toastr: ToastrService,
    public authService: AuthServiceService,
    private router:Router,
    public appService: AppServiceService,
  ) {}

  ngOnInit() {

  }

  ionViewWillEnter(): void {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Admin";
    if(this.appService.isLoggedIn()){
      this.appService.appPages[1] = { title: 'Admin Home', url: '/admin-home', icon: 'person', active:true }
      this.router.navigate(['/admin-home']);
    }else{
      this.appService.appPages[1] = { title: 'Admin Login', url: '/admin', icon: 'person', active:true }
      this.router.navigate(['/admin']);
    }  
  }
  
  login(){
    if((this.email!='' && this.password!='')&&(this.email!=null && this.password!=null)){
      this.authService.SignIn(this.email, this.password);
      this.email = ''; 
      this.password = '';
    }else{
      this.appService.presentToast('top','Invalid Credentials !!!')
    }
  } 
}
