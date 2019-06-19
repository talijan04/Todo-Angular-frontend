import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ITokenPayload } from "../authentication.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

  credentials: ITokenPayload = {
    id: 0,
    //first_name: "",
    //last_name: "",
    name: '',
    surname: '',
    email: "",
    password: "",
    position: "",
    sex: '',

  };

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.auth.register(this.credentials).subscribe(
      () => {
        this.router.navigateByUrl("/login");
      },
      err => {
        console.error("err");
      }
    );
  }

}
