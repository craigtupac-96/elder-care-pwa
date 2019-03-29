import {Component, OnInit} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Sign Up';
  signupForm: FormGroup;

  constructor(private authS: AuthService, private aFireAuth: AngularFireAuth, public fb: FormBuilder) {
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'email': ['', [
        Validators.email,
        Validators.required
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(8),
        Validators.required
        ]
      ]
    });
  }

  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('password'); }

  signUp() {
    return this.authS.registerUser({
      email: this.email.value,
      password: this.password.value,
    });
  }

  onSubmit() {
    this.signUp();
  }

}
