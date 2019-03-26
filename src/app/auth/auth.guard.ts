import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,
Router} from '@angular/router';
import { AuthService } from './auth.service';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  userId: string;
  myBool:  boolean;

  constructor(private authS: AuthService, private router: Router, private aFireAuth: AngularFireAuth,
              private aFirestore: AngularFirestore) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean  {

    return this.authS.user.pipe(
      take(1),
      map(user => !!(user)), // <-- map to boolean
      tap(loggedIn => {
        if (!loggedIn) {
          // If not logged in redirect to login screen
          this.router.navigate(['/login']);
        } else {
          this.userId = firebase.auth().currentUser.uid;
          this.aFirestore.firestore.collection('users').where('uid', '==', this.userId)
            .get().then(querySnap => {
            querySnap.forEach( (doc) => {
              // Assign value in detailsComplete in firestore (for the user currently logged) in to myBool
              this.myBool = doc.data().detailsComplete;
            });
          }).then( event => {
            // using then to wait until the above query completes and then carrying out checks via if statements
            if (!this.authS.isAuth()) {
              // user is not authenticated, redirect to login
              this.router.navigate(['/login']);
            } else if (!this.myBool) {
              // details are not set, redirect to details screen
              this.router.navigate(['/details']);
            }
          }
        );
        }
      })
    );
  }
}
