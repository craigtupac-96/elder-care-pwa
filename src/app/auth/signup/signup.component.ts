import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

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


  showPrimaryForm() {
    this.showPrimary = true;
    this.showSecondary = false;
  }

  showSecondaryForm() {
    this.showPrimary = false;
    this.showSecondary = true;
  }

  onSubmit(form: NgForm) {
    console.log(form);
  }

  constructor() {

  }

  ngOnInit() {
    /*this.title = 'Sign Up';
    this.showPrimary = true;
    this.showSecondary = false;*/
  }

}
