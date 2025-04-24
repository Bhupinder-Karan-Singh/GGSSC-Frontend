import { AppServiceService } from 'src/app/services/app-service.service'; 
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent {

  constructor(public appService:AppServiceService) { }

}
