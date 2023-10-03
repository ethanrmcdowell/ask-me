import { Component, OnInit } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, getDocs, }  from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ask-me';

  constructor(private firestore: Firestore) {
    this.getQuestions();
  }

  submitQuestion(f: any) {
    const collectionInstance = collection(this.firestore, 'questions');
    addDoc(collectionInstance, f.value).then(() => {
      console.log('Data successfully saved!');
    })
    .catch((error) => {
      console.error(error);
    })
  }

  async getQuestions() {
    const q = query(collection(this.firestore, 'questions'));

    const  querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log("DATA ->", doc.data());
    })
  }
}
