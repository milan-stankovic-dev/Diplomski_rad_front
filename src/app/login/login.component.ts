import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { User } from '../domain/User';

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
             name = "username" class = "input"
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
            class = "input"
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
  `,
  styles: [`
  .help{
    color:red !important
  }
  `
  ]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient){}

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
    alert("Submit attempted.")
    this.http.post('http://localhost:8080/api/v1/user/login', userForLogin)
    .subscribe(data=>{
      console.log(data)
    })
  }
}
