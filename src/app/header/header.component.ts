import { Component } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-header',
  template: `
    <div class = 'navbar is-dark'>
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="../assets/image/logo.PNG" height="52px" width="52px" alt="Could not load">
        </a>
      </div>
      <div class = "navbar-menu">
      <div class = "navbar-start" *ngIf = "authService.loggedInStatus | async">
        <a class = "navbar-item" routerLink = "/">Home</a>
        <a class = "navbar-item" routerLink = "/product">Product</a>  
        <a class = "navbar-item" routerLink = "/report">Report</a>
        <a class = "navbar-item" routerLink = "/goods-received-note">Goods received note</a>
        <a class = "navbar-item" routerLink = "/bill-of-lading">Bill of lading</a>
        <a class = "navbar-item">About</a>          
      </div>
      <div class = "navbar-end"*ngIf = "!(authService.loggedInStatus | async)">
        <a class = "navbar-item" routerLink = "/login">Login</a>
        <a class = "navbar-item" routerLink = "/register">Register</a>
    </div>
</div>
  `,
  styles: [ `
  .navbar{
    height : 75px !important ;
    font-size : 20px !important;
  }
  .navbar-item{
    margin:0 !important;
  }
  `
  ]
})
export class HeaderComponent {
  constructor(public authService: AuthService){

  }
}
