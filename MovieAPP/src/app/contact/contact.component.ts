import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  addressForm = this.fb.group({
    message: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    emailAddress: [null, Validators.required],
    reason: [null, Validators.required],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  reasons = [
    { name: 'Error na stranici' },
    { name: 'Korisnička podrška' },
  ];

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router,) { }

  onSubmit(): void {
    this.toastr.success("Uspješno slanje", "Uspjeh");
    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }
}
