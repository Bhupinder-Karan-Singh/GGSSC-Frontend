import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';
import { AppServiceService } from 'src/app/services/app-service.service';
import { EventServiceService } from 'src/app/services/event-service.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.scss'],
})
export class EditEventsComponent  implements OnInit {

  events:any = []
  loading = true
  title = "Events List"

  constructor(
    private eventService: EventServiceService,
    private appComponent: AppComponent,
    private router: Router,
    private appService: AppServiceService,
    private alertController: AlertController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(): void {
    this.loading = true
    this.appService.loading = "Loading";
    this.eventService.getAllEvents().subscribe((response:any)=>{
      if(response.length>0){
        this.events = response.reverse()
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

  editEvent(element:any){
    this.router.navigate(
      ['/create-event/'+element._id ]
    );
  }

  async deleteEvent(element:any){

    const alert = await this.alertController.create({
      header: 'Confirm',
      message: 'Are you sure you want to delete this event?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
        {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');    
            this.loading = true
            this.appComponent.isLoading = true
            this.appService.loading = "Loading";
            this.eventService.deleteEvent(element._id).subscribe((response:any)=>{
              this.loading = false
              this.appService.loading = false;
              const index = this.events.findIndex((item:any) => item._id === element._id);
                if (index !== -1) {
                  this.events.splice(index, 1);
                }
              // if(response == "Deleted"){
              //   window.location.reload()
              // }
            },(error) => {
              this.appService.loading = false
              const errorMessage = "Internal Server Error : "+error.statusText;
              this.appService.presentToast('top',errorMessage)
            })
          },
        },
      ],
    });

    await alert.present();
  }

  createEvent(){
    this.router.navigate(['/create-event']);
  }

  candidateList(event:any){
    console.log(event)
    this.eventService.eventName = event.eventName
    this.router.navigate(
      ['/candidates-list/'+event._id ]
    );
  }

}
