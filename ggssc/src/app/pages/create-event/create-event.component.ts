import { Component, OnInit } from '@angular/core';
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

  imageGuidelines:any = {
    "cover-photo" : []
  }

  constructor(
    public uploadService: UploadServiceService
  ) { }

  ngOnInit() {
  }

  submit(){
  }

  detectChanges(event:any){
    if(event.length >= 3){
      this.buttonDisabled = false
    }else{
      this.buttonDisabled = true
    }
  }
  
}
