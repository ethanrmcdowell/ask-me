import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, getDocs, DocumentData, deleteDoc, doc, orderBy }  from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  constructor(private firestore: Firestore) {}

  async getQuestions() {
    let questionArray: DocumentData[] = [];
    const q = query(collection(this.firestore, 'questions'));
    const  querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data }
      questionArray.push(data);
    });
    return questionArray;
  }

  async getAnswered() {
    let questionArray: DocumentData[] = [];
    const q = query(collection(this.firestore, 'answered'), orderBy('timestamp'));
    const  querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      let data = doc.data();
      const id = doc.id;
      data = { id, ...data }
      questionArray.push(data);
    });
    return questionArray;
  }

  async submitQuestion(data: any) {
    const collectionInstance = collection(this.firestore, 'questions');
    addDoc(collectionInstance, data).then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.error(error);
    })
  }

  async submitAnswer(data: any) {
    const collectionInstance = collection(this.firestore, 'answered');
    addDoc(collectionInstance, data).then(() => {
      console.log("Success!");
    })
    .catch((error) => {
      console.error(error);
    })
  }

  deleteQuestion(id: string) {
    const docInstance = doc(this.firestore, 'questions', id);
    deleteDoc(docInstance).then(() => {
        console.log("Successfully deleted!");
      })
      .catch((error) => {
        console.error(error);
      });
  }
}