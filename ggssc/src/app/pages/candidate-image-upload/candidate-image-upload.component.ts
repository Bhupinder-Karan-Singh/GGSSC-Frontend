import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppServiceService } from 'src/app/services/app-service.service';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { UploadServiceService } from 'src/app/services/upload-service.service';

@Component({
  selector: 'app-candidate-image-upload',
  templateUrl: './candidate-image-upload.component.html',
  styleUrls: ['./candidate-image-upload.component.scss'],
})
export class CandidateImageUploadComponent  implements OnInit {

  @Input() imageGuidelines:any;
  @Output() imageChanged = new EventEmitter<any>();
  constructor(
    public uploadService: UploadServiceService,
    private imageProcess: ImageProcessService,
    public appService: AppServiceService
  ) { }

  ngOnInit() {
  }

  arrayify(obj:any){
    return Object.keys(obj)
  }

  onFileSelected(event: any, stepTitle:any): void{
      var fileStore = []
      if (event.target.files && event.target.files[0]) {
        for(var i = 0;i<event.target.files.length;i++){
          fileStore.push(event.target.files[i])
          if(i>=1)
          return;
          let file = event.target.files[i];
          const reader = new FileReader();
            if(this.uploadService.capturedProfileImages?.stepTitle){
              reader.onload = e => {
                var fileName = file.name
                if(file.size > 1 * 1024 * 1024 && file.size < 15 * 1024 *1024){
                  this.imageProcess.imgToFile(reader.result,fileName,file.type).then((imgObj) => {
                    this.imageAnalysis(imgObj,fileName,stepTitle,reader)
                  }).catch((error) => {
                    console.error('Error:', error);
                });
                }else if(file.size > 15 * 1024 *1024){
                  const errorMessage = "Unsupported media file. Image size too large";
                  this.appService.presentToast('top',errorMessage)
                }else{
                  const imgObj2 = {
                    title: fileName,
                    img: reader.result,
                    size: file.size,
                  }
                  this.imageAnalysis(imgObj2,fileName,stepTitle,reader)
                }
              }
            }else{
              reader.onload = e => {
                var fileName = file.name
                if(file.size > 1 * 1024 * 1024 && file.size < 15 * 1024 * 1024){
                  this.imageProcess.imgToFile(reader.result,fileName,file.type).then((imgObj) => {
                    this.imageAnalysis(imgObj,fileName,stepTitle,reader)
                  }).catch((error) => {
                    console.error('Error:', error);
                });
                }else if(file.size > 15 * 1024 * 1024){
                  const errorMessage = "Unsupported media file. Image size too large";
                  this.appService.presentToast('top',errorMessage)
                }else{
                  const imgObj2 = {
                    title: fileName,
                    img: reader.result,
                    size: file.size,
                  }
                  this.imageAnalysis(imgObj2,fileName,stepTitle,reader)
                }
              }
          }
          reader.readAsDataURL(file);
        };
        event.target.value = null;
      }
    }

    imageAnalysis(imgObj:any,fileName:any,stepTitle:any,reader:any){
      var imageObject = {
        imageFile: imgObj
      }
      this.uploadService.capturingProfilePhotoStep = stepTitle
      this.uploadService.setProfileImages([imageObject]);
      this.imageChanged.emit(this.uploadService.capturedProfileImages);
    }

    deleteImage(stepTitle:any,toDelete:any){
      this.uploadService.capturedProfileImages[stepTitle].splice(this.uploadService.capturedProfileImages[stepTitle].indexOf(toDelete),1);
      if(this.uploadService.capturedProfileImages[stepTitle].length == 0){
        delete this.uploadService.capturedProfileImages[stepTitle]
        this.imageChanged.emit(null);
      }
    }

}
