import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  constructor(public accountService: AccountService, private router: Router,
    private toastr: ToastrService) { }
  member = true;
  reminder = false;
  ngOnInit(): void {
    this.initializeForm();
    this.switchUrl()
  }

  changeRegMode() {
    this.member = !this.member
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl(this.model.username, Validators.required),
      password: new FormControl(this.model.password, Validators.required),
      email: new FormControl(this.model.email, Validators.required)
    })
  }
  registerForm: FormGroup;
  model: any = {}

  registerr() {
    if (this.member) {
      this.register()
    }
    else {
      this.register2()
    }
  }
  register() {
    this.accountService.register(this.model).subscribe(response => {


      window.setTimeout(function () { location.reload() }, 500)
      this.router.navigateByUrl('/')
    }, error => {
      if (error.status == 404) {
        this.toastr.error("Korisničko ime je zauzeto");
      }
      if (error.status == 400) {
        this.toastr.error("Neispravno korisnicko ime ili lozinka");
        this.reminder = true;
      }
    })
  }
  register2() {
    this.accountService.register2(this.model).subscribe(response => {


      window.setTimeout(function () { location.reload() }, 500)
      this.router.navigateByUrl('/')
    }, error => {
      if (error.status == 404) {
        this.toastr.error("Korisničko ime je zauzeto");
      }
      if (error.status == 400) {
        this.toastr.error("Neispravno korisnicko ime ili lozinka");
        this.reminder = true;
      }
    })
  }

  switchUrl() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.router.navigateByUrl('/home')
    }
  }
}
