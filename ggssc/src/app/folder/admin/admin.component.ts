import { Component, inject, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

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
  constructor(
    public toastr: ToastrService
  ) {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Admin";
  }

  login(){
    if((this.email!='' && this.password!='')&&(this.email!=null && this.password!=null)){
      this.userService.SignIn(this.email, this.password);
      this.email = ''; 
      this.password = '';
    }else{
      this.toastr.error("Invalid credentials",'Message');
    }
  }
}
