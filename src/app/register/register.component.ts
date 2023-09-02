import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { RegistrationRequest } from '../domain/RegistrationRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  template: `
    <section class = "hero is-primary is-bold">
      <div class = "hero-body">
        <div class = "container">
          <h1 class = "title">REGISTER</h1>
        </div>
      </div>
    </section>
    <section class = "section">
      <div class = "container">
        <form (ngSubmit)="attemptRegistration()"
            #registerForm = "ngForm">

            <div class = "field"> 
            <label  for="firstName" class = "label">First Name:</label>
            <input type = "text"
             name = "firstname" 
             placeholder="Enter your first name:"
             class = "input"
              (input)="clearError()"
              [(ngModel)] = "firstName"
              #firstNameInput = "ngModel"
              required>
            <div class="help is-error"
             *ngIf="firstNameInput.invalid && firstNameInput.dirty">First name is a required field</div>
          </div>

          <div class = "field"> 
            <label  for="username" class = "label">Last Name:</label>
            <input type = "text"
             name = "lastName" 
             placeholder="Enter your last name:"
             class = "input"
              (input)="clearError()"
              [(ngModel)] = "lastName"
              #lastNameInput = "ngModel"
              required>
            <div class="help is-error"
             *ngIf="lastNameInput.invalid && lastNameInput.dirty">Last name is a required field</div>
          </div>

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

          <div class = "field"> 
            <label  for="password" class = "label">Email:</label>
            <input type = "email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            name = "email"
            placeholder="Enter your email:"
            class = "input"
            (input)="clearError()"
            [(ngModel)] = "email"
            #emailInput = "ngModel"
            required>
            <div class = "help is-error"
             *ngIf="emailInput.invalid && emailInput.dirty">Please enter a valid email address</div>
          </div>
          <br>
          <button type = "submit"
           class = "button is-large is-warning"
           [disabled] = "registerForm.invalid">submit</button>
           
        </form>
        <br>
        <button
           class = "button is-large is-warning" *ngIf="
           shouldDisplayResendButton"
           (click) = "resendEmail()">
           resend email</button>

      </div>
    </section>
    <div *ngIf="errorMessage!==''" class = "notification is-danger">
      {{errorMessage}}
    </div>

<app-modal-message
*ngIf="isModalMessageOpen"
[displayMessage]="messageToDisplay"
(modalClosed)="handleMessageDisplayClosedEvent($event)"
></app-modal-message>
  `,
  styles: [
  ]
})
export class RegisterComponent {
  
  firstName: string = ''
  lastName: string = ''
  email: string = ''
  username: string = ''
  password: string = ''
  errorMessage: string  = ''
  isModalMessageOpen: boolean = false
  messageToDisplay : string = ''
  shouldDisplayResendButton: boolean = false

  handleMessageDisplayClosedEvent($event){
    this.messageToDisplay = ''
    this.isModalMessageOpen = $event
  }

changeModalMessageOpen(message: string):void{
  this.messageToDisplay = message
  this.isModalMessageOpen = !this.isModalMessageOpen
}
resendEmail() {
  const userForEmailResend = this.validateAndCreateUser()
  // alert(JSON.stringify(userForEmailResend))
  this.service.resendEmail(userForEmailResend).subscribe(
    response=>{
      this.changeModalMessageOpen("Email resent successfully.")
    },
    error=>{
      // alert(JSON.stringify(error))
      this.changeModalMessageOpen("Could not resend email. Please try again later." +
      "error: " + error.message)
    }
  )
}
constructor(private service: AuthService, private router: Router){}

clearError() {
  this.errorMessage = ''
}
validateAndCreateUser():RegistrationRequest{
  if(this.username === '' || this.password === '' ||
  this.firstName === '' || this.lastName === '' || 
  this.email === ''){
    alert("All input fields are required")
    throw new Error("Invalid state.")
  }
  const userForRegistration: RegistrationRequest = {
    firstname : this.firstName,
    lastname : this.lastName,
    username : this.username,
    password : this.password,
    email : this.email
  }
  return userForRegistration
}
attemptRegistration() {
  const userForRegistration = this.validateAndCreateUser();
  console.log(`Sending ${JSON.stringify(userForRegistration)}`)

  const apiResponse = this.service.register(userForRegistration).subscribe(response =>{
    localStorage.setItem('username', userForRegistration.username)
    localStorage.setItem('password', userForRegistration.password)
    this.changeModalMessageOpen("Please check your email to continue.")
    this.shouldDisplayResendButton = true
  },
  error => {
    console.log(error.error)
    this.changeModalMessageOpen(error.error)
  }
  )
}

}
