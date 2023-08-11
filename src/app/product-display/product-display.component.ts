import { Component, Input } from '@angular/core';
import { Product } from '../domain/Product';

@Component({
  selector: 'app-product-display',
  templateUrl:'./product-display.component.html',
  styleUrls:['./product-display.component.scss']
})
export class ProductDisplayComponent {
  @Input() productToDisplay: Product
}
