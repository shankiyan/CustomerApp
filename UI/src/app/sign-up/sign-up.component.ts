import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { MessageService } from 'primeng/api';
import { debug } from 'util';
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  IsSignUp: boolean = false;
  LoginEmail;
  LoginPassword;
  FullName;
  Email;
  DOB;
  Password;
  Cpassword;
  ErrorMessage;
  constructor(
    private _appService: AppService,
    private messageService: MessageService) { }

  ngOnInit() {
    if (localStorage.getItem('UserStatus') != undefined) {
      window.location.href = "https://epic-montalcini-25bb4a.netlify.com/customer-list";
    }
  }


  SignUp() {
   var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.ErrorMessage = "";
    if (this.FullName == '' || this.FullName == undefined) {
        this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Full Name' });
    } else if (this.Email == '' || this.Email == undefined)
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Email' });
    }
    else if (!regexp.test(this.Email))
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Valid Email' });
    }
    else if (this.Password == '' ||this.Password == undefined)
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Password' });
    }
    else if (this.Cpassword == '' || this.Cpassword == undefined)
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Confirm Password' });
    }
    else if (this.Password != this.Cpassword)
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Passwords do not match' });
    }
    else if (this.DOB == undefined)
    {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter DOB' });
    }
    else {
      let PostData = {};
      PostData["FullName"] = this.FullName;
      PostData["Email"] = this.Email;
      PostData["Password"] = this.Password;
      PostData["DOB"] = this.DOB;
      debugger;
      this._appService.post(this._appService.API+'Register', PostData)
        .subscribe(response => {
          this.IsSignUp = !this.IsSignUp;
          this.messageService.add({ severity: 'success', summary: '', detail: 'User Registered Successfully' });
        }, error => {
            this.messageService.add({ severity: 'error', summary: '', detail: 'User Already exists' });
        });
    }
  }

  Login() {
    var regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    if (this.LoginEmail == '' || this.LoginEmail == undefined) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Email' });
    }
    else if (!regexp.test(this.LoginEmail)) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Valid Email' });
    }
    else if (this.LoginPassword == '' || this.LoginPassword == undefined) {
      this.messageService.add({ severity: 'warn', summary: '', detail: 'Enter Password' });
    }
    else {
      let postdata = {};
      postdata["Email"] = this.LoginEmail;
      postdata["Password"] = this.LoginPassword;
      this._appService.post(this._appService.API + 'AuthenticateUser' + '', postdata)
        .subscribe(response => {
          this.messageService.add({ severity: 'success', summary: '', detail: 'Logged In Successfully' });
          localStorage.setItem('UserStatus', 'Authenticated');
          localStorage.setItem('Email', response[0]["Email"]);
          window.location.href = "https://epic-montalcini-25bb4a.netlify.com/customer-list";
          
        }, error => {
          this.messageService.add({ severity: 'error', summary: '', detail: 'Invalid Credentials' });
        });
    }
  }

  ToggleButton() {
    this.IsSignUp = !this.IsSignUp;
  }
  
}
