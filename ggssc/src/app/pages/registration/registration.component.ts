import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonModal } from '@ionic/angular';
import { AppServiceService } from 'src/app/services/app-service.service';
import { UploadServiceService } from 'src/app/services/upload-service.service';
import { requiredObjectValidator } from './required-object.validator'; // Adjust the path


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent  implements OnInit, OnDestroy {

  public registrationForm: FormGroup | any;
  public title:any
  registerButtonDisabled:any
  @ViewChild('datePickerModal') datePickerModal: IonModal | any;
  dob:any
  imageGuidelines:any = {
    "profilePhoto" : []
  }
  
  constructor(private fb: FormBuilder,
    private router: Router,
    public appService: AppServiceService,
    public uploadService: UploadServiceService) {
  }

  ngOnInit() {
    if(this.appService.registerEvent == "" || this.appService.registerEvent == null || this.appService.registerEvent == undefined){
      this.router.navigate(['/home']);
    }
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      dob: ['', Validators.required],
      fatherName: ['', Validators.required],
      motherName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      images: [null, requiredObjectValidator], 
    });
  }

  ngOnDestroy(): void {
      this.uploadService.capturedProfileImages = {}
  }

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

  onSubmit() {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value
      formData.dob = this.formatDate(formData.dob)
      console.log('Form Data:', formData);
    } else {
      console.log('Form is invalid!');
    }
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

  handleImageChange(obj:any): void {
    console.log(obj)
    if(obj != null && obj != undefined && obj != ""){
      this.registrationForm.get('images')?.setValue(this.uploadService.capturedProfileImages);
    }else {
      this.registrationForm.get('images')?.setValue('');
    }
  }

}
