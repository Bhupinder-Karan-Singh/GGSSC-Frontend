import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
})
export class EditEventsComponent  implements OnInit {

  displayedColumns: string[] = ['Event Name','Event Description','Status','Cover Photo','Action'];
  events:any = []
  loading = true
  title = "Events List"

  constructor(
    private eventService: EventServiceService,
    private appComponent: AppComponent,
    private router: Router
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loading = true
    this.appComponent.isLoading = true
    this.eventService.getEvents().subscribe((response:any)=>{
      this.events = response
      this.loading = false
      this.appComponent.isLoading = false
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
    this.eventService.deleteEvent(element._id).subscribe((response:any)=>{
      this.loading = false
      this.appComponent.isLoading = false
      if(response == "Deleted"){
        window.location.reload()
      }
    })
  }

  createEvent(){
    this.router.navigate(['/create-event']);
  }

}
