import { NgModule } from '@angular/core';
import { SignUpComponent } from './sign-up/sign-up.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppService } from './app.service';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { TableModule } from 'primeng/table';


const routes: Routes = [
  { path: 'app/home', component: HomeComponent },
  { path: '', component: SignUpComponent },
  { path: 'customer-list', component: CustomerListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    CustomerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastModule,
    TableModule,
    RouterModule.forRoot(routes),
    FormsModule,
    
  ],
  providers: [AppService, MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }



