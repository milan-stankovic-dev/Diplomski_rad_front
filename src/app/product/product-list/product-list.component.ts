import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/domain/Product';
import { ProductService } from 'src/app/service/product.service';
import { ProductType } from '../../domain/ProductType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  product: any = {}
  isModalOpen: boolean = false
  products: Product[] = []
  filteredProducts: Product[] = []
  selectedProduct: Product | null = null
  searchTerm = ''
  productTypes: string[] = Object.values(ProductType)

  insertForm : FormGroup = new FormGroup({})


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
    this.insertForm.valueChanges.subscribe((formValues) => {
      this.product.productName = formValues.productName;
      this.product.weight = formValues.weight;
      this.product.fragile = formValues.fragile;
      this.product.amount = formValues.amount;
      this.product.type = formValues.productType;
      this.product.price = formValues.price;
    });

    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.filteredProducts = products;
    });
  }

  alterModal(): void {
    if(this.isModalOpen)
    this.isModalOpen = false
    else
    this.isModalOpen = true;
  }

  selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log('Selected Product:', this.selectedProduct);
  }


  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  submitProduct(): void {
    
    console.log('Submitted product:', JSON.stringify(this.product));
    alert(JSON.stringify(this.product))
    this.productService.insertProduct(this.product)
    .subscribe(
      response => {
        alert("Saved in database!")
      }
    )
    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.filteredProducts = products;
    });
    this.alterModal()


  }

}
