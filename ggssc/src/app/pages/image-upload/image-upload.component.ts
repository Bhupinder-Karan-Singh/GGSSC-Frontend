import { Component, Input, OnInit } from '@angular/core';
import { ImageProcessService } from 'src/app/services/image-process.service';
import { UploadServiceService } from 'src/app/services/upload-service.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss'],
})
export class ImageUploadComponent  implements OnInit {
  @Input() imageGuidelines:any;
  constructor(
    public uploadService: UploadServiceService,
    private imageProcess: ImageProcessService,
  ) { }

  ngOnInit() {
    console.log(this.imageGuidelines)
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
          console.log(file)
          const reader = new FileReader();
            if(this.uploadService.capturedImages?.stepTitle){
              reader.onload = e => {
                var fileName = file.name
                if(file.size > 1 * 1024 *1024 && file.size < 15 * 1024 *1024){
                  this.imageProcess.imgToFile(reader.result,fileName,file.type).then((imageFile) => {
                    this.imageAnalysis(imageFile,fileName,stepTitle,reader)
                  }).catch((error) => {
                    console.error('Error:', error);
                });
                }else if(file.size > 15 * 1024 *1024){
                  console.log("Unsupported media file. Please try again.")
                }else{
                  this.imageAnalysis(this.imgToFile(reader.result,fileName,file.type),fileName,stepTitle,reader)
                }
              }
            }else{
              reader.onload = e => {
                var fileName = file.name
                if(file.size > 1 * 1024 * 1024 && file.size < 15 * 1024 * 1024){
                  this.imageProcess.imgToFile(reader.result,fileName,file.type).then((imageFile) => {
                    this.imageAnalysis(imageFile,fileName,stepTitle,reader)
                  }).catch((error) => {
                    console.error('Error:', error);
                });
                }else if(file.size > 15 * 1024 * 1024){
                  console.log("Unsupported media file. Please try again.")
                }else{
                  this.imageAnalysis(this.imgToFile(reader.result,fileName,file.type),fileName,stepTitle,reader)
                }
              }
          }
          reader.readAsDataURL(file);
        };
        event.target.value = null;
      }
    }


    imgToFile(img:any,title:any,type:any): File {
      var extension = type.split('/')[1];
      const imageName = title+'.'+extension;
      const imageBlob = this.dataURItoBlob(img.replace('data:'+type+';base64,',''));
      const imageFile = new File([imageBlob], imageName, { type: type });
      return imageFile;
    }
    
    dataURItoBlob(dataURI:any) {
      const byteString = window.atob(dataURI);
      const arrayBuffer = new ArrayBuffer(byteString.length);
      const int8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < byteString.length; i++) {
        int8Array[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([int8Array], { type: 'image/png' });    
      return blob;
    } 

    imageAnalysis(imageFile:any,fileName:any,stepTitle:any,reader:any){
      var imageObject = {
        title:fileName,
        img: reader.result,
      }
      this.uploadService.capturingStep = stepTitle
      this.uploadService.setImages([imageObject]);
      // this.uploadService.uploadResource(imageFile,fileName).subscribe((result:any)=>{
      //   },(e)=>{
      // })
    }

    deleteImage(stepTitle:any,toDelete:any){
      this.uploadService.capturedImages[stepTitle].splice(this.uploadService.capturedImages[stepTitle].indexOf(toDelete),1);
      if(this.uploadService.capturedImages[stepTitle].length == 0){
        delete this.uploadService.capturedImages[stepTitle]
      }
    }
}
