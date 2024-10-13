import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss'],
})
export class AdminHomeComponent  implements OnInit {
  public title!: string;
  public page!: string;
  public loggedIn=false;
  constructor(
    private authService: AuthServiceService,
    private appService: AppServiceService,
    private router:Router,
  ) {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Admin-home";
  }

  logout(){
    this.authService.SignOut()
  }

  goto(){
    this.router.navigate(['/home']);
  }
}
