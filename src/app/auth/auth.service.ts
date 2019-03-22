import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthData } from './auth-data.model';
import {Observable} from 'rxjs';


@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
/*  user$: Observable<User>;*/

  constructor(private router: Router, private aFireAuth: AngularFireAuth, private aFirestore: AngularFirestore) {
    // get auth data || null
/*    this.user$ = this.aFireAuth.authState
      .switchMap(user => {
        if (user) {
          return this.aFirestore.doc('users/${user.uid}').valueChanges();
        } else {
          return Observable.of(null);
        }
      });*/
  }

  registerUser(authData: AuthData) {
    this.aFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
      });
  }

  login(authData: AuthData) {
    this.aFireAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        console.log(result);
/*        this.updateUserData(result.user);*/
        this.authSuccess();
      })
      .catch(error => {
        console.log(error);
      });
  }

/*  private updateUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.aFirestore.doc('users/$user.uid}');
    const data: user = {
      uid: user.uid,
      email: user.email,
      roles: {
        primary: true
      }
    };
    return userRef.set(data, {merge: true});
  }*/

  logout() {
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = true;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/']);
  }
}
