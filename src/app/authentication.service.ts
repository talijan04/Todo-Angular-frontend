import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface IUserDetails {
  id: number
  name: string
  surname: string
  email: string
  password: string
  position: string
  sex: string
  exp: number
  iat: number
  //uid: number
}
 
interface ITokenResponse {
  token: string
}

export interface ITokenPayload {
  id: number
  name: string
  surname: string
  email: string
  password: string
  position: string
  sex: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  private token: string

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('usertoken', token)
    this.token = token
    console.log(this.token)
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('usertoken')
    }
    return this.token
  }

  public getUserDetails(): IUserDetails {
    const token = this.getToken()
    let payload
    if (token) {
      payload = token.split('.')[1]
      payload = window.atob(payload)
      //console.log('TAL:', JSON.parse(payload))
      return JSON.parse(payload)
    } else {
      return null
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails()
    if (user) {
      return user.exp > Date.now() / 1000
    } else {
      return false
    }
  }

  public register(user: ITokenPayload): Observable<any> {
    console.log(user)
    return this.http.post(`/api/register`, user, {
      headers: { 'Content-type': 'application/json' }
    })
  
  }

  public login(user: ITokenPayload): Observable<any> {
    const base = this.http.post(`/api/login`, 
          { email: user.email, password: user.password },
          {
               headers: { 'Content-type': 'application/json'}
          })

    console.log(user);

    const request = base.pipe(
      map((data: ITokenResponse) => {
        if (data.token) {
          this.saveToken(data.token)
        }
        return data
      })
    )

    return request
  }


public profile(): Observable<any> {
  return this.http.get(`/api/profile`,{ 
    headers: {'Authorization': `Bearer ${this.getToken()}`}
})
}


  public logout(): void {
    this.token = ''
    window.localStorage.removeItem('usertoken')
    this.router.navigateByUrl('/')
  }
}
