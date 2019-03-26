import {Component, OnInit} from '@angular/core';
import {FormGroup, FormControl, Validators, NgForm, FormBuilder, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import {User} from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Sign Up';
  signupForm: FormGroup;
/*  showSecondary = false;
  showPrimary = true;*/

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
  /*get firstName() { return this.signupForm.get('firstName'); }*/

/*  showPrimaryForm() {
    this.showPrimary = true;
    this.showSecondary = false;
  }

  showSecondaryForm() {
    this.showPrimary = false;
    this.showSecondary = true;
  }*/
  signUp() {
    return this.authS.registerUser({
      email: this.email.value,
      password: this.password.value,
    });
    // this.authS.updateUser( { firstName: this.firstName.value});
  }

  // https://angularfirebase.com/lessons/multi-step-signup-firebase-email-password-auth-angular-reactive-forms/
  // https://www.youtube.com/watch?v=KpfJCEvpS9g
/*  setDetails(user) {
    console.log('->->->' + this.firstName.value); // test
    return this.authS.updateUser(user, {
      firstName: this.firstName.value
      // detailsComplete: true
    });
  }*/

  onSubmit() {
    this.signUp();
    /*this.setDetails();*/
    /*  this.authS.registerUser({
        email: form.value.email,
        password: form.value.password,
      });
      this.setDetails(this.aFireAuth.user);
    }*/
  }

  /*isUid() {
    if (this.authS.isAuth()) {
      return true;
    } else {
      return false;
    }
  }*/
}
