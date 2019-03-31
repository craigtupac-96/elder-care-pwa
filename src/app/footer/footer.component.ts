import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentDate = Date.now();
  userId: string;

  constructor(private authS: AuthService, private aFirestore: AngularFirestore) { }

  ngOnInit() {
    if (this.authS.isAuth()) {
      this.userId = firebase.auth().currentUser.uid;
    }
  }

  private checkAuth() {
    if (this.authS.isAuth()) {
      return true;
    } else {
      return false;
    }
  }

}
