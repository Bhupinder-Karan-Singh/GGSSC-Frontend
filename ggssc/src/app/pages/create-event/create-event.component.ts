import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';
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
    private appService : AppServiceService
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params)=>{
      if(params['formPayloadId']){
        this.payloadId = params['formPayloadId']
        this.appService.loading = "Loading...";
        this.eventService.getEvent(this.payloadId).subscribe((response:any)=>{
          if(response.length>0){
            this.eventName = response[0].eventName
            this.eventDescription = response[0].eventDescription
            this.uploadService.capturedImages = response[0].images
            this.saveButtonDisabled = false
            this.createForm = false
            this.title = "Edit Event"
            this.loading = false
            this.appService.loading = false;
          }
        })
      }else{
        this.uploadService.capturedImages = {}
        this.payloadId=""
        this.loading = false
        this.appService.loading = false;
      }
    })
  }

  submit(){
    this.appService.loading = "Loading...";
    this.payload = {
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "images":this.uploadService.capturedImages,
      "status":"active"
    }
    this.eventService.submitEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/edit-events']);
      this.appService.loading = false;
    })
  }

  save(){
    this.appService.loading = "Loading...";
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
      this.appService.loading = false;
    })
  }

  detectChanges(event:any){
    if(event.length < 3 ){
      this.createButtonDisabled = true
      this.saveButtonDisabled = true
      }else{
        if(this.uploadService.capturedImages.coverPhoto){
          if(this.uploadService.capturedImages.coverPhoto.length > 0){
            this.createButtonDisabled = false
            this.saveButtonDisabled = false
          }
      }
    }
  }

  handleImageChange(obj:any): void {
    console.log(obj)
    if(obj == null || obj == undefined || obj == ""){
      this.createButtonDisabled = true
      this.saveButtonDisabled = true
    }else{
      this.createButtonDisabled = true
      this.saveButtonDisabled = true
      if(obj.coverPhoto && obj.coverPhoto.length>0){
        if(this.eventName.length > 3){
          this.createButtonDisabled = false
          this.saveButtonDisabled = false
        }
      }
    }
  }

  eventsList(){
    this.router.navigate(['/edit-events']);
  }
  
}
