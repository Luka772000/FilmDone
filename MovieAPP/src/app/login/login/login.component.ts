import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { UserManagementServiceService } from 'src/app/_services/user-management-service.service';
interface Option {
  value: boolean;
  viewValue: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  model: any = {}
  loginOrRegister = true;

  constructor(private umService: UserManagementServiceService, public accountService: AccountService, private router: Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeForm1();
    this.switchUrl()
  }


  changeReg() {
    this.router.navigateByUrl('/register')
  }


  initializeForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(this.model.username, Validators.required),
      password: new FormControl(this.model.password, Validators.required),
    })
  }


  login() {
    console.log(this.model)
    this.accountService.login(this.model).subscribe(response => {
      this.router.navigateByUrl('/home')
      window.setTimeout(function () { location.reload() }, 0)

    }, error => {
      console.log(error.error);
      this.toastr.error("Neispravno korisnicko ime ili lozinka");
    })
  };


  switchUrl() {
    const user: User = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.router.navigateByUrl('/home')
    }
  }




  registerForm: FormGroup;
  register() {
    this.accountService.register(this.model).subscribe(response => {


      window.setTimeout(function () { location.reload() }, 500)
      this.router.navigateByUrl('/home')
    }, error => {
      console.log(error);
      this.toastr.error("Neispravno korisnicko ime ili lozinka");
    })
  }
  register1() {
    this.accountService.register2(this.model).subscribe(response => {


      window.setTimeout(function () { location.reload() }, 500)
      this.router.navigateByUrl('/home')
    }, error => {
      console.log(error);
      this.toastr.error("Neispravno korisnicko ime ili lozinka");
    })
  }
  initializeForm1() {
    this.registerForm = new FormGroup({
      username: new FormControl(this.model.username, Validators.required),
      password: new FormControl(this.model.password, Validators.required),
      email: new FormControl(this.model.email, Validators.required)
    })
  }
}
