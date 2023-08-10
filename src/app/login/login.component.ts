import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../domain/User';
import { AuthService } from '../service/auth.service';
import { AuthRequest } from '../userUtils/auth-request';
import { AuthResponse } from '../userUtils/auth-response';
import { Observable} from 'rxjs';

@Component({
  selector: 'app-login',
  template: `
    <section class = "hero is-primary is-bold">
      <div class = "hero-body">
        <div class = "container">
          <h1 class = "title">LOGIN</h1>
        </div>
      </div>
    </section>

    <section class = "section">
      <div class = "container">
        <form (ngSubmit)="attemptLogin()"
            #loginForm = "ngForm">
          <div class = "field"> 
            <label  for="username" class = "label">Username:</label>
            <input type = "text"
             name = "username" 
             placeholder="Enter your username:"
             class = "input"
              (input)="clearError()"
              [(ngModel)] = "username"
              #usernameInput = "ngModel"
              required>
            <div class="help is-error"
             *ngIf="usernameInput.invalid && usernameInput.dirty">Username is a required field</div>
          </div>

          <div class = "field"> 
            <label  for="password" class = "label">Password:</label>
            <input type = "password"
            name = "password"
            placeholder="Enter your password:"
            class = "input"
            (input)="clearError()"
            [(ngModel)] = "password"
            #passwordInput = "ngModel"
            required>
            <div class = "help is-error"
             *ngIf="passwordInput.invalid && passwordInput.dirty">Password is a required field</div>
          </div>
          <br>
          <button type = "submit"
           class = "button is-large is-warning"
           [disabled] = "loginForm.invalid">submit</button>
        </form>


      </div>
    </section>
    <div *ngIf="errorMessage!==''" class = "notification is-danger">
      {{errorMessage}}
    </div>
  `,
  styles: [`
  .help{
    color:red !important
  }
  .notification{
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin: 100px
  }
  `
  ]
})
export class LoginComponent {

clearError() {
  this.errorMessage = ''
}

  username: string = '';
  password: string = '';
  errorMessage: string  = ''

  constructor(private service: AuthService){}

  attemptLogin(){
    
    if(this.username === '' || this.password === ''){
      alert("All input fields are required")
      return;
    }

    let userForLogin : User = {
      id : 0,
      name : '',
      lastname : '',
      role: 'USER',
      username : this.username,
      password : this.password
    }
    console.log("Sending a request...")
    let apiResponse = this.service.login(this.username, this.password).subscribe(
      
      response => {
        console.log(response)
      },
      error => {
        // alert(error.error)
        console.log(error.error)
        this.errorMessage = error.error
        
      }
    )
    // apiResponse.unsubscribe()
  }
}
