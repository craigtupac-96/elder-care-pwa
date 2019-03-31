import {Component, OnInit, OnDestroy} from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { Subscription } from 'rxjs/Subscription';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit, OnDestroy {
  // private title: string;
  title = 'Elder-Care';
  isAuth = false;
  authSubscription: Subscription;
  userId: string;
  displayName: string;

  constructor(private authS: AuthService,  private aFireAuth: AngularFireAuth,
              private aFirestore: AngularFirestore) { }

  ngOnInit() {
    this.authSubscription = this.authS.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
      if (this.isAuth) {
        this.userId = firebase.auth().currentUser.uid;
        // get user information
        this.aFirestore.firestore.collection('users').where('uid', '==', this.userId)
          .get().then(querySnap => {
          querySnap.forEach( (doc) => {
            this.displayName = doc.data().firstName + ' ' + doc.data().lastName;
          });
        }).then( event => {
          // may do something here
        });
      }
    });
  }

  onLogout() {
    this.authS.logout();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

}
