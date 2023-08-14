import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/domain/Product';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.scss']
})
export class ProductUpdateComponent implements OnInit{

  @Input() isModalOpen: boolean = false
   insertForm : FormGroup = new FormGroup({})
  @Input() product : Product | null= {
    id: 0,
    productName: '',
    weight: 0,
    fragile: false,
    amount: 0,
    type: '',
    price: 0
  }
  @Input() filteredProducts: Product[] = []
  productTypes: Array<ProductType> = Object.values(ProductType)
  @Output() updatedProduct: EventEmitter<Product> = new EventEmitter()

  constructor(private productService: ProductService,
    private formBuilder: FormBuilder) {}

    ngOnInit(): void {
      this.insertForm = this.formBuilder.group({
        productName: ['', [
          Validators.required,
          Validators.nullValidator,
        ]],
        weight: [null,[
          Validators.required,
          Validators.nullValidator,
          Validators.min(1),
        ]],
        fragile: [null,[
          Validators.required,
          Validators.nullValidator,
        ]],
        amount: [null,[
          Validators.required,
          Validators.nullValidator,
          Validators.min(0)
        ]],
        productType: ['',[
          Validators.required,
          Validators.nullValidator,
        ]],
        price: ['',[
          Validators.required,
          Validators.nullValidator,
          Validators.min(1),
        ]]
      })
    }

    alterModal() :void{
      if(this.isModalOpen){
        this.isModalOpen = false
      }else{
        this.isModalOpen = true
      }
    }

    submitProduct(): void {
    
      console.log('Submitted product:', JSON.stringify(this.product));
      this.productService.updateProduct(this.product === null? null : this.product)
      .subscribe(
        response => {
          alert("Updated in database!")
          
          this.updatedProduct.emit(response)
          // this.productService.getAllProducts().subscribe((products) => {
          //   console.log(products);
          //   this.products = products;
          //   this.filteredProducts = products;
          // });
          // this.alterModal()
        },
        error =>{
          console.log(error)
          alert(error.error)
          this.alterModal()
        }
      )
    }
}
