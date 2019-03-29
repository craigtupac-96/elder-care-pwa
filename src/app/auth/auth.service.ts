import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthData } from './auth-data.model';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { FullEmailList } from './lists.model';
import { switchMap } from 'rxjs/operators';
import * as firebase from 'firebase';

// https://bigcodenerd.org/enforce-cloud-firestore-unique-field-values
// https://stackblitz.com/edit/angular-firestore-check-if-value-exist
@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  user: Observable<User>;

  constructor(private router: Router, private aFireAuth: AngularFireAuth, private aFirestore: AngularFirestore) {
    // get auth data || null
    this.user = this.aFireAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.aFirestore.doc('users/' + user.uid).valueChanges();
        } else {
          return of(null);
        }
      }));
  }

  registerUser(authData: AuthData) {
    this.aFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.setInitialUserDoc(result.user);
        this.addToEmailList(result.user);
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
      });
  }

  // the initial user document is set with the uid and email stored in firebase authentication
  private setInitialUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.aFirestore.doc('users/' + user.uid);
    // ****** interface set email list as <Email> ??????
    const data: User = {
      uid: user.uid,
      email: user.email,
      detailsComplete: false // detailsComplete set to false to force redirection to the details form
    };
    userRef.set(data);
  }

  private addToEmailList(user) {
    const emailListRef: AngularFirestoreDocument<FullEmailList> = this.aFirestore.doc('fullEmailList/' + user.email);
    const data: FullEmailList = {
      email: user.email
    };
    emailListRef.set(data);
  }

  login(authData: AuthData) {
    this.aFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
      });
  }

  logout() {
    this.isAuthenticated = false;
    this.authChange.next(false);
    this.router.navigate(['/login']);
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/']);
  }

/*  // might use this in a bit
  getUser(userId) {
    return this.aFirestore.firestore.collection('users').where('uid', '==', userId)
      .get().then(querySnap => {
      querySnap.forEach(function (doc) {
        console.log(doc.data());
      });
    });
  }*/
}
