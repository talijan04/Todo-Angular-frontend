import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ITokenPayload } from '../authentication.service'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  credentials: ITokenPayload = {
    id: 0,
    //first_name: '',
    //last_name: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    position: '',
    sex: '',
  }


  constructor(private auth: AuthenticationService, private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(
      () => {
        this.toastr.success('Uspešno ste se prijavili.');
        console.log('Uspešno ste se prijavili.')
        this.router.navigateByUrl('/tasks2')
      },
      err => {
        this.toastr.error('Pogrešno korisničko ime ili lozinka!')
        console.log('Pogrešno korisničko ime ili lozinka!')
        console.error(err)
      }
    )
  }


}
