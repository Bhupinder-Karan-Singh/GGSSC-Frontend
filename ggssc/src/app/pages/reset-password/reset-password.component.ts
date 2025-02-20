import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppServiceService } from 'src/app/services/app-service.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent  implements OnInit {

  public forgotPasswordForm: FormGroup | any;
  email:any

  constructor(
    private angularFireAuth: AngularFireAuth,
    private fb: FormBuilder,
    public appService: AppServiceService,
    private router: Router,
  ) { }

  ngOnInit() {

      this.forgotPasswordForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
      });

  }

  resetPassword(){
    if(this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.value.email
      if(!email) { 
        this.appService.presentToast('top',"Invalid Email")
      }
      this.angularFireAuth.sendPasswordResetEmail(email, { url: 'https://bhupinderkaransingh.com' }).then(
        () => this.appService.presentToast('top',"Password reset link sent to email : "+email)
      ) 
      .catch((error: { message: any; }) => {
        console.log(error.message)
        this.appService.presentToast('top',error.message)
      }); 
    } else {
      console.log('Form is invalid!');
    }
  }

  goBack(){
    this.router.navigate(['/admin']);
  }

}
