import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'angular-toastify';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private authService: AuthenticationService,private userService: UserService, private router: Router, private ts: ToastService, private formBuilder: FormBuilder){}

  user : any;
  tempUrl !: any;
  imageUrl !: string;
  changePswd : boolean = false;

  ngOnInit(){
    this.getUserDetails();
  }

  patchProfileForm(){
    this.profileForm.patchValue({
      email : this.user.email,
      username : this.user.username
    });
    this.profileForm.controls.email.disable();
  }

  changePassword(){
    this.changePswd = true;
  }

  @ViewChild('closeButton') closeButton !: ElementRef;
  updateProfile(){
    const formData = new FormData();
    formData.append('username', this.profileForm.controls.username.value as string);
    this.selectedFile ? formData.append('profile', this.selectedFile) : {};
    this.changePswd ? formData.append('password', this.profileForm.controls.password.value as string) : {};
    this.userService.updateProfile(formData).subscribe((data: any)=>{
      if(data.status === true){
        this.ts.success(data.message);
        this.getUserDetails();
        this.closeButton.nativeElement.click();
      }
    })
  }

  selectedFile !: File;

  imageChange(e: any){
    this.selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = ()=>{
      this.tempUrl = reader.result;
    }
  }

  getUserDetails(){
    this.userService.getUser().subscribe((data: any)=>{
      this.user = data.data;
      this.imageUrl = `http://localhost:3000/${data.data.profile}`;
      this.tempUrl = this.imageUrl;
    })
  }

  profileForm = this.formBuilder.group({
    username : ['', Validators.required],
    email : ['', Validators.required],
    profile : [''],
    password : ['']
  })

  logout(){
    this.authService.logout().subscribe((data: any)=>{
      if(data.status === true){
        this.ts.error(data.message);
        localStorage.clear();
        this.router.navigate(['/auth']);
      }else{
        this.ts.error(data.message);
      }
    })
  }

  @ViewChild('fileInput') fileInput !: ElementRef;
  changeDp(){
    this.fileInput.nativeElement.click();
  }

  resetThings(){
    this.tempUrl = this.imageUrl;
    this.profileForm.reset();
    this.changePswd = false
  }
}
