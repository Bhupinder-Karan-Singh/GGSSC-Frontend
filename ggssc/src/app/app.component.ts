import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentYear:any;
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Admin', url: '/admin', icon: 'person' },
    { title: 'Registration', url: '/registration', icon: 'document' },
  ];
  constructor() {}
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    }
}
