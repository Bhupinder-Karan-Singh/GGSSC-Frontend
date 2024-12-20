import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { AppServiceService } from 'src/app/services/app-service.service';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
})
export class EditEventsComponent  implements OnInit {

  displayedColumns: string[] = ['Event','Desc','Status','File','Action'];
  events:any = []
  loading = true
  title = "Events List"

  constructor(
    private eventService: EventServiceService,
    private appComponent: AppComponent,
    private router: Router,
    private appService: AppServiceService
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loading = true
    this.appService.loading = "Loading...";
    this.eventService.getEvents().subscribe((response:any)=>{
      if(response.length>0){
        this.events = response
        this.loading = false
        this.appService.loading = false;
      }else{
        this.loading = false
        this.appService.loading = false;
      }
    },(error) => {
      this.appService.loading = false
      const errorMessage = "Internal Server Error : "+error.statusText;
      this.appService.presentToast('top',errorMessage)
    })
  }

  edit(element:any,index:any){
    this.router.navigate(
      ['/create-event/'+element._id ]
    );
  }

  delete(element:any, index:any){
    this.loading = true
    this.appComponent.isLoading = true
    this.appService.loading = "Loading...";
    this.eventService.deleteEvent(element._id).subscribe((response:any)=>{
      this.loading = false
      this.appService.loading = false;
      if(response == "Deleted"){
        window.location.reload()
      }
    },(error) => {
      this.appService.loading = false
      const errorMessage = "Internal Server Error : "+error.statusText;
      this.appService.presentToast('top',errorMessage)
    })
  }

  createEvent(){
    this.router.navigate(['/create-event']);
  }

}
