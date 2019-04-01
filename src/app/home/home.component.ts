import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'Dashboard';
  userId: string;
  accountType: string;

  constructor(public auth: AuthService, private aFirestore: AngularFirestore) {
    this.userId = firebase.auth().currentUser.uid;
    this.aFirestore.firestore.collection('users/').where('uid', '==', this.userId)
      .get().then(querySnap => {
        querySnap.forEach((doc) => {
          this.title = doc.data().firstName + "'s Dashboard";
          this.accountType = doc.data().role;
        });
    });
  }

  ngOnInit() {
  }

  isPrimary() {
    if (this.accountType === 'Primary') {
      return true;
    } else {
      return false;
    }
  }

}
