import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewWillEnter } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AppServiceService } from 'src/app/services/app-service.service';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public title!: string;
  public page!: string;
  events:any = []
  loading:any
  constructor(
    private appService : AppServiceService,
    private eventService: EventServiceService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Registration";
    this.loading = true
    this.appComponent.isLoading = true
    this.appComponent.showLoading()
    this.eventService.getEvents().subscribe((response:any)=>{
      if(response.length>0){
        response.forEach((element:any) => {
          this.events.push(element)
        });
        this.loading = false
        this.appComponent.isLoading = false
      }
    })
  }

  ionViewWillEnter(): void {
    if(this.appService.isLoggedIn()){
      this.appService.appPages[1] = { title: 'Admin Home', url: '/admin-home', icon: 'person', active:true }
    }else{
      this.appService.appPages[1] = { title: 'Admin Login', url: '/admin', icon: 'person', active:true }
    }  
  }

}
