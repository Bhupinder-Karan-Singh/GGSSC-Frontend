import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import {
  Router,
  // import as RouterEvent to avoid confusion with the DOM Event
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router'
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentYear:any;
  isLoading = false
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Admin', url: '/admin', icon: 'person' },
    // { title: 'Registration', url: '/registration', icon: 'document' },
  ];
  constructor(
    private loadingCtrl: LoadingController,
    private router: Router
  ) {
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })
  }
  ngOnInit(): void {
    this.currentYear = new Date().getFullYear();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log('Current URL:', event.url);
      }
    });
    }

    async showLoading() {
      const loading = await this.loadingCtrl.create({
        message: 'Loading...',
      });
    
      await loading.present();
      const condition = this.isLoading;  // Async condition or API call
      if (condition) {
        await loading.dismiss();
      } else {
        console.log('Condition not met');
        await loading.dismiss();  // Make sure to always dismiss to prevent a hanging spinner
      }
  }
  
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.showLoading()
    }
    if (event instanceof NavigationEnd) {
      this.isLoading = false
    }

    if (event instanceof NavigationCancel) {
      this.showLoading()
    }
    if (event instanceof NavigationError) {
      this.isLoading = false
    }
  }
    
}
