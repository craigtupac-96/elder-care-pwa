import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  // private title: string;
  // private showPrimary: boolean;
  // private showSecondary: boolean;
  title = 'Sign Up';
  showSecondary = false;
  showPrimary = true;

  constructor(private authService: AuthService) { }

  showPrimaryForm() {
    this.showPrimary = true;
    this.showSecondary = false;
  }

  showSecondaryForm() {
    this.showPrimary = false;
    this.showSecondary = true;
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnInit() {
  }

}
