import { Injectable } from '@angular/core';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = getAuth();
  userEmail: any;

  private userAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  userAuthenticated$ = this.userAuthenticatedSubject.asObservable();

  loginUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
      signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
          this.userAuthenticatedSubject.next(true);
          this.userEmail = userCredential.user.email;
          callback({  success: true, message: userCredential })
      })
      .catch((error) => {
          this.userAuthenticatedSubject.next(false);
          callback({ success: false, message: error.code })
      })
  }

  logOutUser(callback: (response: { success: boolean, message?: any }) => void) {
      signOut(this.auth)
      .then(() => {
          this.userAuthenticatedSubject.next(false);
          callback({ success: true });
      })
      .catch((error) => {
          this.userAuthenticatedSubject.next(true);
          callback({ success: false, message: error })
      })
  }

  registerUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
        createUserWithEmailAndPassword(this.auth, email, password)
        .then((userCredential) => {
          this.userAuthenticatedSubject.next(true);
          callback({ success: true, message: userCredential });
        })
        .catch((error) => {
          this.userAuthenticatedSubject.next(false);
          callback({ success: false, message: error.code });
        })
  }
}
