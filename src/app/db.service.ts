import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, query, getDocs, DocumentData, }  from '@angular/fire/firestore';

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
      questionArray.push(doc.data());
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
}




// loginUser(email: string, password: string, callback: (response: { success: boolean, message: any }) => void) {
//   signInWithEmailAndPassword(this.auth, email, password)
//   .then((userCredential) => {
//       this.userAuthenticatedSubject.next(true);
//       this.userEmail = userCredential.user.email;
//       callback({  success: true, message: userCredential })
//   })
//   .catch((error) => {
//       this.userAuthenticatedSubject.next(false);
//       callback({ success: false, message: error.code })
//   })
// }