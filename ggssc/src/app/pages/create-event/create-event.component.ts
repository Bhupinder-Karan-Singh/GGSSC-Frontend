import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
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
  startTime:any;
  endTime:any;
  location:any;
  isChecked:any;
  fileName:any;
  createButtonDisabled = true
  saveButtonDisabled = true
  payload:any
  createForm=true
  payloadId:any
  title = "Create Event"
  loading = true
  selectedDate: string = '';
  @ViewChild('datePickerModal') datePickerModal: IonModal | any;
  @ViewChild('datePickerModal2') datePickerModal2: IonModal | any;

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
            const startTime = new Date(response[0].startTime); // Convert selected value to Date object
            this.startTime = startTime.toISOString();
            // this.startTime = response[0].startTime.toISOString()
            const endTime = new Date(response[0].endTime); // Convert selected value to Date object
            this.endTime = endTime.toISOString();
            // this.endTime = response[0].endTime.toISOString()
            this.location = response[0].location,
            this.isChecked = response[0].status == "Active" ? true : false
            this.uploadService.capturedImages = response[0].images
            this.saveButtonDisabled = false
            this.createForm = false
            this.title = "Edit Event"
            this.loading = false
            this.appService.loading = false;
          }
        },(error) => {
          this.appService.loading = false
          const errorMessage = "Internal Server Error : "+ error.statusText;
          this.appService.presentToast('top',errorMessage)
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
      "startTime": this.formatDate(this.startTime),
      "endTime": this.formatDate(this.endTime),
      "location":this.location,
      "images":this.uploadService.capturedImages,
      "status":this.isChecked ? "Active" : "InActive",
      "createdOn": new Date().toLocaleString(),
      "createdBy" : localStorage.getItem('email'),
      "updatedBy" : localStorage.getItem('email')
    }
    this.eventService.submitEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/edit-events']);
      this.appService.loading = false;
    },(error) => {
      this.appService.loading = false
      const errorMessage = "Internal Server Error : "+ error.statusText;
      this.appService.presentToast('top',errorMessage)
    })
  }

  save(){
    this.appService.loading = "Loading...";
    this.payload = {
      "_id":this.payloadId,
      "eventName":this.eventName,
      "eventDescription":this.eventDescription,
      "startTime": this.formatDate(this.startTime),
      "endTime":  this.formatDate(this.endTime),
      "location":this.location,
      "images":this.uploadService.capturedImages,
      "status":this.isChecked ? "Active" : "InActive",
      "createdOn": new Date().toLocaleString(),
      "createdBy" : localStorage.getItem('email'),
      "updatedBy" : localStorage.getItem('email')
    }

    this.eventService.saveEvent(this.payload).subscribe((response:any)=>{
      this.uploadService.capturedImages = {}
      this.router.navigate(['/edit-events']);
      this.appService.loading = false;
    },(error) => {
      this.appService.loading = false
      const errorMessage = "Internal Server Error : "+error.statusText;
      this.appService.presentToast('top',errorMessage)
    })
  }

  // Helper function to format the date (no time)
  formatDate(date: string): string {
    const parsedDate = new Date(date);
    return parsedDate.toLocaleDateString('en-GB', {
      // weekday: 'short', // Example: 'Tue'
      year: 'numeric',
      month: 'short', // Example: 'Dec'
      day: 'numeric',
      // hour: '2-digit',
      // minute: '2-digit',
      // hour12: true // 12-hour format
    });
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
        if(this.eventName != "" && this.eventName != undefined && this.eventName != null){
          if(this.eventName.length > 3){
            this.createButtonDisabled = false
            this.saveButtonDisabled = false
          }
        }
      }
    }
  }

  eventsList(){
    this.router.navigate(['/edit-events']);
  }

  // onCheckboxChange(event: any) {
  //   console.log('Checkbox state:', this.isChecked);
  //   console.log('Event details:', event);
  // }

  openDatePicker() {
    this.datePickerModal.present();
  }

  closeDatePicker() {
    this.datePickerModal.dismiss();
  }

  confirmDate() {
    // Confirm the selected date (if needed, you can add additional logic here)
    this.datePickerModal.dismiss();
  }

  openDatePicker2() {
    this.datePickerModal2.present();
  }

  closeDatePicker2() {
    this.datePickerModal2.dismiss();
  }

  confirmDate2() {
    // Confirm the selected date (if needed, you can add additional logic here)
    this.datePickerModal2.dismiss();
  }
  
}
