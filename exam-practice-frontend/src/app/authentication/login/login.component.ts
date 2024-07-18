import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  constructor(private formBuilder : FormBuilder, private authService: AuthenticationService, private router : Router, private ts: ToastService){}

  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password : ['', Validators.required]
  })

  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm.controls.email.value as string, this.loginForm.controls.password.value as string).subscribe((data: any)=>{
          if(data.status === true){
            this.ts.success(data.message);
            localStorage.setItem('user', JSON.stringify({token : data.token, role: data.role}));
            this.router.navigate([`/${data.role}`])
          }else{
            this.ts.error(data.message);
          }
      })
    }else{
      this.loginForm.markAllAsTouched()
    }
  }
}
