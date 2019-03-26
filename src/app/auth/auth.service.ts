import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthData } from './auth-data.model';
import { Observable, of } from 'rxjs';
import { User} from './user.model';
import { switchMap, first } from 'rxjs/operators';
import * as firebase from 'firebase';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;
  user: Observable<User>;

  constructor(private router: Router, private aFireAuth: AngularFireAuth, private aFirestore: AngularFirestore) {
    // get auth data || null
    // does this do anything??
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
        this.authSuccess();
        // return this.createUser(result.user);
        return this.setInitialUserDoc(result.user);
      })
      .catch(error => {
        console.log(error);
      });
  }

  private setInitialUserDoc(user) {
    const userRef: AngularFirestoreDocument<User> = this.aFirestore.doc('users/' + user.uid);
    const data: User = {
      uid: user.uid,
      email: user.email,
      detailsComplete: false
    };
    return userRef.set(data);
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
    this.authChange.next(false);
    this.router.navigate(['/login']);
    this.isAuthenticated = false;
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccess() {
    this.isAuthenticated = true;
    this.authChange.next(true);
    this.router.navigate(['/']);
  }

  // might use this in a bit
  getUser(userId) {
    return this.aFirestore.firestore.collection('users').where('uid', '==', userId)
      .get().then(querySnap => {
      querySnap.forEach(function (doc) {
        console.log(doc.data());
      });
    });
  }
}
