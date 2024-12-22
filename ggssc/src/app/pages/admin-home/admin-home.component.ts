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

  featureList = [
    {
      "name": "Create an event",
      "subtitle": "subtitle",
      "description": "Click on proceed to create an event",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
      "task":"createEvent"
    },
    {
      "name": "Edit events",
      "subtitle": "Edit events",
      "description": "Edit already created event",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
      "task":"editEvents"
    },
    // {
    //   "name": "Candidate list",
    //   "subtitle": "Event subtitle",
    //   "description": "Event details",
    //   "color": "COLOR",
    //   "feature_icon": "assets/Power plant - blue.svg",
    //   "task":"candidateList"
    // },
  ]

  logout(){
    this.authService.SignOut()
  }

  goto(){
    this.router.navigate(['/home']);
  }

  proceed(task:string){
    if(task=="createEvent"){
      this.router.navigate(['/create-event']);
    }
    if(task=="editEvents"){
      this.router.navigate(['/edit-events']);
    }
  }
}
