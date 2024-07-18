import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder, private router : Router, private ts: ToastService, private authService: AuthenticationService){}

  signupForm = this.formBuilder.group({
    username : ['', Validators.required],
    email : ['', [Validators.required, Validators.email]],
    password : ['', Validators.required],
    profile : ['', Validators.required],
    role : ['user', Validators.required]
  })

  selectedFile : any;

  changeFile(e: any){
    this.selectedFile = e.target.files[0]; 
  }

  signup(){
    if(this.signupForm.valid){
      const formData = new FormData();
      formData.append('username', this.signupForm.controls.username.value as string);
      formData.append('email', this.signupForm.controls.email.value as string);
      formData.append('password', this.signupForm.controls.password.value as string);
      formData.append('role', this.signupForm.controls.role.value as string);
      formData.append('profile', this.selectedFile);
      this.authService.signup(formData).subscribe((data: any)=>{
        if(data.status === true){
          this.ts.success(data.message);
          this.router.navigate(['/auth']);
        }else{
          this.ts.error(data.message);
        }

      })
    }else{
      this.signupForm.markAllAsTouched();
    }
  }
}
