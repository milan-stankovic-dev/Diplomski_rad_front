import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  template: `
    <div class = 'navbar is-dark'>
      <div class="navbar-brand">
        <a class="navbar-item">
          <img src="../assets/image/logo.PNG" height="100px" width="50px" alt="Could not load">
        </a>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class HeaderComponent { }
