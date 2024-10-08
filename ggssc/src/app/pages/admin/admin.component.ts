import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent  implements OnInit {
  public title!: string;
  public page!: string;
  email!: string;
  password!: string;
  cpassword!:string;
  success!:boolean;
  name!: string;
  public loggedIn=false;
  constructor(
    public toastr: ToastrService,
    public authService: AuthServiceService,
    private router:Router,
    public appService: AppServiceService
  ) {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Admin";
    this.loggedIn = this.appService.isLoggedIn()
    if(this.loggedIn){
      this.router.navigate(['/admin-home']);
    }else{
      this.router.navigate(['/admin']);
    }
  }

  login(){
    if((this.email!='' && this.password!='')&&(this.email!=null && this.password!=null)){
      this.authService.SignIn(this.email, this.password);
      this.email = ''; 
      this.password = '';
    }else{
      this.toastr.error("Invalid credentials",'Message');
    }
  } 
}
