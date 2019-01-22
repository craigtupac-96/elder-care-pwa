import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  title = 'Sign Up';
  showPrimary = true;
  showSecondary = false;

  showPrimaryForm() {
    this.showPrimary = true;
    this.showSecondary = false;
  }

  showSecondaryForm() {
    this.showPrimary = false;
    this.showSecondary = true;
  }

  constructor() {

  }

  ngOnInit() {
  }

}
