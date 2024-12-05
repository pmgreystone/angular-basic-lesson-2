import { Component, OnInit } from '@angular/core';
import { LoginService, Profile } from '../../services/login.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  username: FormControl = new FormControl('')
  password: FormControl = new FormControl('')

  constructor(private loginService: LoginService, private router: Router) {}

  ngOnInit(): void {
    this.loginService.loadProfiles()
  }
  
  tryLogin() {
    if(this.isValid(this.username.value) && this.isValid(this.password.value)) {
      const profile: Profile | null = this.loginService.tryLogin(this.username.value, this.password.value)
      if(profile?.isAdmin) {
        this.router.navigateByUrl('/admin')
      } else {
        this.router.navigateByUrl('/home')
      }
    } else {
      alert("invalid username or password")
    }
  }

  isValid(value: String): Boolean {
    return value != null && value.length > 0
  }
}
