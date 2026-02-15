import { Component, HostListener } from '@angular/core';
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
import { AppServiceService } from './services/app-service.service';
import { AuthServiceService } from './services/auth-service.service';
import { BnNgIdleService } from 'bn-ng-idle';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  currentYear:any;
  isLoading = false
  timeoutId:any;

  constructor(
    private bnIdle: BnNgIdleService,
    private loadingCtrl: LoadingController,
    private router: Router,
    public appService: AppServiceService,
    private authService: AuthServiceService
  ) {
    this.router.events.subscribe((e : RouterEvent) => {
      this.navigationInterceptor(e);
    })

    this.bnIdle.startWatching(300000).subscribe((res:any) => {
      if (res) {
        if(this.appService.isLoggedIn()){
          console.log("true")
          console.log(res)
          this.authService.SignOut()
          this.appService.presentToast('top',"Session expired !!! Please login again")
        }
      }
    });

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
      message: 'Loading',
    });
  
    await loading.present();
    const condition = this.isLoading;  // Async condition or API call
    if (condition) {
      await loading.dismiss();
    } else {
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

  @HostListener('window:click', ['$event'])
  onFocus(event: FocusEvent) {
    if(this.appService.isLoggedIn()){
      if(this.router.url == "/admin"){
        this.router.navigate(['/admin-home']);
      }
      this.appService.appPages[1] = { title: 'Admin Home', url: '/admin-home', icon: 'person', active:true}
    }else{
      this.appService.appPages[1] = { title: 'Admin Login', url: '/admin', icon: 'person', active:true}
      if(this.router.url == "/admin-home" || this.router.url == "/create-event"){
        this.router.navigate(['/admin']);
      }
    }  
  } 
}
