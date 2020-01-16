import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  CustomersList = [];
  UserEmail;
  EnteredEmail;
  constructor(private _appService: AppService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.UserEmail = localStorage.getItem('Email');
    this.LoadContacts();
  }


  LoadContacts() {
    let postdata = { Email: localStorage.getItem('Email') };
    this._appService.post(this._appService.API + 'GetUserData', postdata)
      .subscribe(response => {

        this.CustomersList = response[0]["Contacts"];
        
        for (let i = 0; i < this.CustomersList.length; i++) {
          if(this.isToday(this.CustomersList[i]["DOB"])==true)
          {
            this.CustomersList[i]["IsBirthDay"] = true;
          }
          else {
            this.CustomersList[i]["IsBirthDay"] = false;            
          }
       
        }
        console.log(this.CustomersList);
      }, error => {
       
      });
  }

  SendWishes(ContactEmailID) {
    let postdata = {};
    postdata["Email"] = this.UserEmail;
    postdata["ContactEmailID"] = ContactEmailID;
    this._appService.post(this._appService.API + 'SendEmail', postdata)
      .subscribe(response => {
        this.messageService.add({ severity: 'success', summary: '', detail: 'Wishes Sent Successfully' });
      }, error => {

      });
    this.messageService.add({ severity: 'success', summary: '', detail: 'Wishes Sent Successfully' });
  }

  isToday(someDate) {
    let input = new Date(someDate);
    let today = new Date(); 
    if (input.getDate() == today.getDate() &&
      input.getMonth() == today.getMonth() &&
      input.getFullYear() == today.getFullYear()) {
       return true;
     }
     else {
       return false;
     }
  }
  AddToContacts() {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (this.CustomersList.find(f => f.Email == this.EnteredEmail) != undefined) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Already Added to contacts' });
    }
    else
    if (this.EnteredEmail == "" || this.EnteredEmail == undefined) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Email ID to Add' });
    }
    else if (!regexp.test(this.EnteredEmail)) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Valid Email' });
    }
    else {
      let postdata = {};
      postdata["Email"] = this.EnteredEmail;
      this._appService.post(this._appService.API + 'VerifyUserEmail', postdata)
        .subscribe(response => {
          console.log(response);
          if (response["Email"] != localStorage.getItem('Email')) {
            let data = {};
            data["Email"] = localStorage.getItem('Email');
            data["ContactEmailID"] = this.EnteredEmail;
            this._appService.post(this._appService.API + 'AddToContacts',data)
              .subscribe(response => {
                this.messageService.add({ severity: 'success', summary: '', detail: 'Added to your contacts' });
                this.LoadContacts();
                console.log(response);
              }, error => {

              });

          }
          else {
            this.messageService.add({ severity: 'error', summary: '', detail: 'Cannot add your email ID to Contacts' });
          }
        }, error => {
            this.messageService.add({ severity: 'error', summary: '', detail: 'User is not registered' });
        });
    }
  }

  SignOut() {
    localStorage.clear();
    window.location.href = "https://epic-montalcini-25bb4a.netlify.com";
  }
}
