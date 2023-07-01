import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-info is-bold is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
    <!-- <img src="../assets/image/background.jpg" alt="Couldn't load image"> -->
    <p class="title">
      Home page!
    </p>
    
  </div>
  </div>
</section>
  `,
  styles: [`
      .hero{
        background-image: url('/assets/image/background.jpg') !important;
        background-size : cover;
        background-position: center center
      }
    `
  ]
})
export class HomeComponent {

}
