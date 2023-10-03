import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, getDocs, }  from '@angular/fire/firestore';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private firestore: Firestore) {
    this.getQuestions();
  }

  title = 'ask-me';
  userEmail: any;
  userName: any;
  userQuestion: any;
  questionArray: any = [];

  submitQuestion() {
    let formData = {
      email: this.userEmail,
      name: this.userName,
      question: this.userQuestion,
      timestamp: this.getDate(),
    }

    const collectionInstance = collection(this.firestore, 'questions');
    addDoc(collectionInstance, formData).then(() => {
      console.log('Data successfully saved!');
    })
    .catch((error) => {
      console.error(error);
    })
  }

  scrollDown() {
    const element = document.querySelector("#qContainer");
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async getQuestions() {
    const q = query(collection(this.firestore, 'questions'));
    const  querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      this.questionArray.push(doc.data());
    });
    console.log("QUESTIONS ->", this.questionArray);
  }

  getDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
