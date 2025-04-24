import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadServiceService {

  capturedImages:any = {}
  capturingStep:any

  capturedProfileImages:any = {}
  capturingProfilePhotoStep:any

  constructor() { }

  // uploadResource(imgFile:any,title:any){
  //   var observable = new Observable(subscriber=>{
  //     var formData: any = new FormData();
  //     formData.append("file", imgFile);
  //   })
  //   return observable;
  // }
  
  setImages(images:any){
    images.forEach((image:any) => {
      if(this.capturedImages[this.capturingStep]){
        this.capturedImages[this.capturingStep] = [image]
      }else if(this.capturingStep){
        this.capturedImages[this.capturingStep] = [image]
      }
    });
  }

  setProfileImages(images:any){
    images.forEach((image:any) => {
      if(this.capturedProfileImages[this.capturingProfilePhotoStep]){
        this.capturedProfileImages[this.capturingProfilePhotoStep] = [image]
      }else if(this.capturingProfilePhotoStep){
        this.capturedProfileImages[this.capturingProfilePhotoStep] = [image]
      }
    });
  }

}
