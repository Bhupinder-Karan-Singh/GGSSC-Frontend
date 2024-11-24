import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventServiceService } from 'src/app/services/event-service.service';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { UploadServiceService } from 'src/app/services/upload-service.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss'],
})
export class CreateEventComponent  implements OnInit {
  eventName:any;
  eventDescription:any;
  fileName:any;
  buttonDisabled = true
  payload:any

  imageGuidelines:any = {
    "coverPhoto" : []
  }

  constructor(
    public uploadService: UploadServiceService,
    private eventService: EventServiceService,
    private router:Router,
  ) { }

  ngOnInit() {
  }

  submit(){
    this.payload = {
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "images":this.uploadService.capturedImages,
      "status":"active"
    }
    console.log(this.payload)
    this.eventService.submitEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/home']);
    })
  }

  detectChanges(event:any){
    if(event.length >= 3){
      this.buttonDisabled = false
    }else{
      this.buttonDisabled = true
    }
  }
  
}
