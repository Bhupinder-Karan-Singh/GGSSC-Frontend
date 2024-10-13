import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public title!: string;
  public page!: string;
  constructor(
    private appService : AppServiceService
  ) {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Registration";
  }

  ionViewWillEnter(): void {
    if(this.appService.isLoggedIn()){
      this.appService.appPages[1] = { title: 'Admin Home', url: '/admin-home', icon: 'person'}
    }else{
      this.appService.appPages[1] = { title: 'Admin Login', url: '/admin', icon: 'person'}
    }  
  }

  events = [
    {
      "name": "Event 1",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
  ]

}
