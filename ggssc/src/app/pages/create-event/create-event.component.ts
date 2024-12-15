import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  createButtonDisabled = true
  saveButtonDisabled = true
  payload:any
  createForm=true
  payloadId:any
  title = "Create Event"
  loading = true

  imageGuidelines:any = {
    "coverPhoto" : []
  }

  constructor(
    public uploadService: UploadServiceService,
    private eventService: EventServiceService,
    private router:Router,
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params['formPayloadId']){
        this.payloadId = params['formPayloadId']
        this.eventService.getEvent(this.payloadId).subscribe((response:any)=>{
          if(response.length>0){
            this.eventName = response[0].eventName
            this.eventDescription = response[0].eventDescription
            this.uploadService.capturedImages = response[0].images
            this.saveButtonDisabled = false
            this.createForm = false
            this.title = "Edit Event"
            this.loading = false
          }
        })
      }else{
        this.uploadService.capturedImages = {}
        this.payloadId=""
        this.loading = false
      }
    })
  }

  submit(){
    this.payload = {
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "images":this.uploadService.capturedImages,
      "status":"active"
    }

    this.eventService.submitEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/edit-events']);
    })
  }

  save(){
    this.payload = {
      "_id":this.payloadId,
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "images":this.uploadService.capturedImages,
      "status":"active"
    }

    this.eventService.saveEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/edit-events']);
    })
  }

  detectChanges(event:any){
    if(event.length >= 3){
      this.createButtonDisabled = false
      this.saveButtonDisabled = false
    }else{
      this.createButtonDisabled = true
      this.saveButtonDisabled = false
    }
  }

  eventsList(){
    this.router.navigate(['/edit-events']);
  }
  
}
