import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoginRequest } from '../domain/LoginRequest';

@Component({
  selector: 'app-verification',
  template: `
    <h1>Processing... please wait</h1>
  `,
  styles: [
  ]
})
export class VerificationComponent implements OnInit{

  token: string
  username: string
  password: string

  constructor(private route: ActivatedRoute, private service: AuthService,
    private router: Router){}


  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.token = params['token']
      
      this.username = localStorage.getItem('username')
      this.password = localStorage.getItem('password')
      localStorage.clear()

      const user: LoginRequest={
        username : this.username,
        password : this.password,
      }
      const response = this.service.verifyToken(this.token, user).subscribe(
        response =>{
          // localStorage.setItem('token', this.token)
          if(response === true){
          this.service.login(this.username, this.password).subscribe(
            response=>{
              console.log("Logged in!")
            }, 
            error =>{
              alert(error.error)
            }
          )
          }else{
            alert('You are not authorized to continue using this app.')
            setTimeout(() => {
              this.router.navigate(['/register']);
            }, 4000);
          }
        },
        error=>{
          alert(error.message)
        }
      )
    })
  }
}
