import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Profile {
  username: String
  password: String
  isAdmin: Boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoginService implements OnInit {

  profiles: Profile[] = []
  loggedInProfile: Profile | null
  apiUrl: String = "http://localhost:3000/profiles"

  constructor(private httpClient: HttpClient) {
    /*
    this.profiles = [
      { username:"admin", password:"admin", isAdmin:true },
      { username:"greystone", password:"greystone", isAdmin: true },
      { username:"vancouver", password:"vancouver", isAdmin: false },
      { username:"granville", password:"granville", isAdmin: true }
    ]
    */
    this.loggedInProfile = null
  }
  
  ngOnInit() {
    this.getProfiles().subscribe((result) => {
      this.profiles = result
    })
  }

  getProfiles(): Observable<Profile[]> {
    return this.httpClient.get<Profile[]>(this.apiUrl + '/profiles');
  }

  tryLogin(username: String, password: String): Profile | null {
    if (!this.isValid(username) || !this.isValid(password)) return null
    const profile: Profile = this.profiles.filter(item => item.username == username)[0]
    if(profile == null) return null

    if (profile.password == password) {
      this.loggedInProfile = profile
      return profile
    }
    
    return null
  }
  
  tryLogout() {
    if(this.loggedInProfile != null) {
      this.loggedInProfile = null
    }
  }

  isAdmin(): Boolean {
    return this.loggedInProfile?.isAdmin || false
  }

  isValid(value: String): Boolean {
    return value != null && value.length > 0
  }
}
