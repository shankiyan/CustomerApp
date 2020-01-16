import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'CustomerNew';
  constructor(
    private _appService: AppService
  ) { }


  Login() {
    let postData = [];
    this._appService.post('https://immense-mountain-96755.herokuapp.com/app/ShortenURL', postData)
      .subscribe(response => {
       
      }, error => {

      });
  }


}
