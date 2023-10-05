import { Component,  OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { DbService  } from '../db.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent {
  constructor(private authService: AuthService,  private dbService: DbService) {
    this.getQuestions();
  }

  questionArray: any;
  myResponse: any;


  submitAnswer(item: any) {
    console.log(item);
    let submitData = {
      name: item.name,
      question: item.question,
      answer: item.response,
      timestamp: this.getDate(),
    }

    this.dbService.submitAnswer(submitData).then(async res => {
      console.log(res);
      await this.deleteQuestion(item)
        .then((res) => {
          console.log(res);
        });
    }).catch(error => {
      console.error(error);
    });
  }

  async deleteQuestion(item: any) {
    try {
      await this.dbService.deleteQuestion(item.id);
    } catch (error) {
      console.error(error);
    } finally {
      this.getQuestions();
    }
  }

  async getQuestions() {
    this.dbService.getQuestions().then(questions => {
      this.questionArray = questions.reverse();
      console.log("questions fetched ->", this.questionArray);
    }).catch(error => {
      console.error(error);
    });
  }

  signOutUser() {
    this.authService.logOutUser((response) => {
      if (response.success) {
        console.log("SUCCESS:", response);
      } else {
        console.log("FAILURE:", response);
      }
    })
  }

  getDate() {
    const date = new Date();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
