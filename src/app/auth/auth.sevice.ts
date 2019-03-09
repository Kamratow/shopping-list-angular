import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as firebase from 'firebase';

import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router, private store: Store<fromApp.AppState>) {}

    signupUser(email: string, password: string) {
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                user => {
                    this.store.dispatch(new AuthActions.Signup());
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            )
    }

    signInUser(email: string, password: string) {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(
                response => {
                    this.store.dispatch(new AuthActions.Signin());
                    this.router.navigate(['/']);
                    firebase.auth().currentUser.getIdToken()
                        .then(
                            (token: string) => {
                                this.store.dispatch(new AuthActions.SetToken(token));
                            }
                        )
                }
            )
            .catch(
                error => console.log(error)
            );
    }

    logout() {
        firebase.auth().signOut();
        this.store.dispatch(new AuthActions.Logout);
    }
}