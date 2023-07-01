import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  template: `
    <section class="hero is-info is-bold is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
    
    <!-- <p class="title">
      This is the home page of this website. To use other functionalities of this website,
      please refer to the navigation menu above.
    </p> -->
    
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
