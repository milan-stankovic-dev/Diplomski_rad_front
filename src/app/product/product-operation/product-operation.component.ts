import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/domain/Product';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-operation.component.html',
  styleUrls: ['./product-operation.component.scss']
})
export class ProductUpdateComponent implements OnInit{

  @Input() isModalOpen: boolean = false
   insertForm : FormGroup
  @Input() product
  @Output() filteredProducts: EventEmitter<Product[]> = new EventEmitter()
  @Input() title: string
  @Input() buttonText: string
  @Input() executeMethod: (() => void) | null = null
  productTypes: Array<ProductType> = Object.values(ProductType)
  @Output() updatedProduct: EventEmitter<any> = new EventEmitter()
  @Input() modalMethod: ()=>any
  type: string = ''
  @Output() products: EventEmitter<Product[]> = new EventEmitter()

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.insertForm = this.formBuilder.group({
        productName: ['', [
          Validators.required,
        ]],
        weight: [null,[
          Validators.required,
          Validators.min(1),
        ]],
        fragile: [null,[
          Validators.required,
        ]],
        amount: [null,[
          Validators.required,
          Validators.min(0)
        ]],
        type: ['',[
          Validators.required,
          Validators.nullValidator,
        ]],
        price: ['',[
          Validators.required,
          Validators.min(1),
        ]]
      })
      this.insertForm.valueChanges.subscribe((formValues) => {
          this.product.fragile = formValues.fragile;
          this.product.type = formValues.type;
      })
    }

    alterModal() :void{
      this.isModalOpen = !this.isModalOpen
    }

    submitProduct(): void {
  if (this.modalMethod) {
    this.modalMethod().then(response => {
      this.updatedProduct.emit(response);
    }).catch(error => {
      console.error(error);
      // Handle error if needed
    });
  }
}
}
