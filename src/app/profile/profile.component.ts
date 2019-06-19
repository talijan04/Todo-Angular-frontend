import { Component, OnInit } from '@angular/core';
import { AuthenticationService, IUserDetails } from '../authentication.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  
  details: IUserDetails

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
    
    this.auth.profile().subscribe(
      user => {
        this.details = user
      },
      err => {
        console.log('Greska 001>')
        console.error(err)
      }
    )
  }

}



