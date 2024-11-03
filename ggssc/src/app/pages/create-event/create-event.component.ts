import { Component, OnInit } from '@angular/core';
import { CreateEventServiceService } from 'src/app/services/create-event-service.service';
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
    "cover-photo" : []
  }

  constructor(
    public uploadService: UploadServiceService,
    private createEvenet: CreateEventServiceService
  ) { }

  ngOnInit() {
  }

  submit(){
    this.payload = {
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "images":this.uploadService.capturedImages
    }
    console.log(this.payload)
    this.createEvenet.submitEvent(this.payload).subscribe((response:any)=>{
      console.log(response)
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
