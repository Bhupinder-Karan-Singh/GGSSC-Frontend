import { Injectable } from '@angular/core';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessService {

  constructor(private imageCompress: NgxImageCompressService,) { }
  imgToFile(img:any, title:any, type:any): Promise<any> {
    // console.log("in image process service")
    return new Promise((resolve, reject) => {
        console.log('Size in bytes was:', this.imageCompress.byteCount(img));
        this.imageCompress.compressFile(img, 0, 50, 50).then((result: DataUrl) => {
            console.log(`Compressed: ${result.substring(0, 50)}... (${result.length} characters)`);
            console.log('Size in bytes is now:', this.imageCompress.byteCount(result));
            // var extension = type.split('/')[1];
            // const imageName = title+'.'+extension;
            // const imageBlob = this.dataURItoBlob(result.replace('data:'+type+';base64,',''));
            // const imageFile = new File([imageBlob], imageName, { type: type });
            const obj = {
              title: title,
              img: result,
              size: result.length,
            }
            resolve(obj);
        }).catch((error) => {
            reject(error);
        });
    });
  }
//   dataURItoBlob(dataURI:any) {
//     const byteString = window.atob(dataURI);
//     const arrayBuffer = new ArrayBuffer(byteString.length);
//     const int8Array = new Uint8Array(arrayBuffer);
//     for (let i = 0; i < byteString.length; i++) {
//       int8Array[i] = byteString.charCodeAt(i);
//     }
//     const blob = new Blob([int8Array], { type: 'image/png' });    
//     return blob;
//  }
}
