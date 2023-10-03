import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, getDocs, }  from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { DbService } from './db.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private firestore: Firestore, private authService: AuthService,  private dbService: DbService) {
    this.getQuestions();
  }

  title = 'ask-me';
  userEmail: any;
  userName: any;
  userQuestion: any;
  questionArray: any = [];
  showAdmin: boolean = false;
  userLogin: any;
  userPass: any;
  error: boolean = false;
  errorMsg: string = '';
  userAuthenticated: boolean = false;
  feedbackMsg: string = '';

  ngOnInit() {
    this.authService.userAuthenticated$.subscribe(isAuthenticated => {
      this.userAuthenticated = isAuthenticated;
    })
  }

  adminToggle() {
    this.showAdmin = !this.showAdmin;
  }

  submitQuestion() {
    let formData = {
      email: this.userEmail,
      name: this.userName,
      question: this.userQuestion,
      timestamp: this.getDate(),
    }

    this.dbService.submitQuestion(formData).then(res => {
      this.feedbackMsg = "Success!";
      setTimeout(() => {
        this.feedbackMsg = '';
      }, 5000);
    }).catch(error => {
      console.error(error);
      this.feedbackMsg = "Error!";
      setTimeout(() => {
        this.feedbackMsg = '';
      }, 5000);
    })
  }

  scrollDown() {
    const element = document.querySelector("#qContainer");
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async getQuestions() {
    this.dbService.getQuestions().then(questions => {
      this.questionArray = questions;
      console.log("questions fetched ->", this.questionArray);
    }).catch(error => {
      console.error(error);
    });
  }

  getDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  loginUser() {
    this.authService.loginUser(this.userLogin, this.userPass, (response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
        this.handleErrors(response.message);
      }
    })
  }

  signOutUser() {
    this.authService.logOutUser((response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
        this.handleErrors(response.message);
      }
    })
  }

  handleErrors(errorCode: string) {
    this.error = true;
    if (errorCode === 'auth/email-already-in-use') {
      this.errorMsg = "E-mail address already in use!";
    } else if (errorCode === 'auth/passwords-no-match') {
      this.errorMsg = "Passwords do not match."
    } else if (errorCode === 'auth/invalid-email') {
      this.errorMsg = "E-mail address is invalid.";
    } else if (errorCode === 'auth/user-not-found') {
      this.errorMsg = "User not found."
    } else if (errorCode === 'auth/weak-password') {
      this.errorMsg = "Please use a stronger password."
    } else {
      this.errorMsg = "Unspecified error.";
    }


    setTimeout(() => {
      this.error = false;
      this.errorMsg = '';
    }, 5000);
  }
}
