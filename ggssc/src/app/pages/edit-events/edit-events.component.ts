import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
})
export class EditEventsComponent  implements OnInit {

  displayedColumns: string[] = ['Event Name','Event Description','Edit'];
  events:any = []
  loading:any

  constructor(
    private eventService: EventServiceService,
    private appComponent: AppComponent
  ) { }

  ngOnInit() {
    this.eventService.getEvents().subscribe((response:any)=>{
      console.log(response)
      if(response.length>0){
        this.events = response
        this.loading = false
        this.appComponent.isLoading = false
      }
    })
  }

  edit(element:any, rack:any,index:any){
  }

  save(element:any, rack:any,index:any){
  }

}
