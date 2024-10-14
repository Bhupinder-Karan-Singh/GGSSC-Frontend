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

  imageGuidelines:any = {
    "Image 1" : [
      {full:"",short:""}
    ]
  }

  constructor(
    public uploadService: UploadServiceService
  ) { }

  ngOnInit() {
  }

  submit(){
  }
  
}
