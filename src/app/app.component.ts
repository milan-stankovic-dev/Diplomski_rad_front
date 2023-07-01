import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <!-- <h1>Hello world!</h1> -->
    <app-header></app-header>
    <router-outlet></router-outlet>
    <app-footer></app-footer>
  `,
  styles: []
})
export class AppComponent {
  title = 'diplomski-rad-frontend';
}
