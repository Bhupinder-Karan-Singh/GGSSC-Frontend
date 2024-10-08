import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent  implements OnInit {
  public title!: string;
  public page!: string;
  constructor() {}

  ngOnInit() {
    this.title = "Guru Gobind Singh Study Circle, Canada";
    this.page = "Registration";
  }

  events = [
    {
      "name": "Event 1",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
    {
      "name": "Event 2",
      "subtitle": "Event subtitle",
      "description": "Event description",
      "color": "COLOR",
      "feature_icon": "assets/Power plant - blue.svg",
    },
  ]

}
