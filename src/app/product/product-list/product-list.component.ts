import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { Product } from 'src/app/domain/Product';
import { ProductService } from 'src/app/service/product.service';
import { ProductType } from '../../domain/ProductType';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

handleProductList($event: any) {
  alert(JSON.stringify($event))
  this.products = $event
  this.filteredProducts = $event
}
  product: any = {}
  isModalInsertOpen: boolean = false
  isModalDeleteOpen: boolean = false
  isModalUpdateOpen: boolean = false
  products: Product[]
  filteredProducts: Product[]
  selectedProduct: Product | null = null
  searchTerm = ''
  productTypes: string[] = Object.values(ProductType)
  isModalMessageOpen: boolean = false
  @Output() reactiveProductList: Product[]
  messageToDisplay: string = ''
  
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.filteredProducts = products;
    });
  }

  alterModalInsert(): void {
    this.isModalInsertOpen = !this.isModalInsertOpen
  }

  alterModalDelete():void{
    if(this.selectedProduct== null || this.selectProduct== undefined){
      this.alterModalMessage("Please select a product for deletion.")
    }else
    this.isModalDeleteOpen = !this.isModalDeleteOpen
  }

  alterModalUpdate():void{
    this.isModalUpdateOpen = !this.isModalUpdateOpen
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

  submitProduct(): Promise<Product[]> {
    return new Promise((resolve, reject) =>{
      console.log('Submitted product:', JSON.stringify(this.product));
      this.productService.insertProduct(this.product)
      .subscribe(
        response => {
          this.productService.getAllProducts().subscribe((products) => {
            console.log(products);
            this.products = products;
            this.filteredProducts = products;
            resolve(products)
          });
        },
        error =>{
          reject(error)
        }
      )
    })
  }

  deleteProduct(product: Product| null) {
    if(product === null){
      this.alterModalDelete();

      return;
    }
    this.productService.deleteProduct(this.selectedProduct === null? null : this.selectedProduct.id)
    .subscribe(
      response=>{
        this.alterModalMessage("Deleted product")
        this.productService.getAllProducts().subscribe((products) => {
          console.log(products);
          this.products = products;
          this.filteredProducts = products;
          this.selectedProduct = undefined
        });
        this.alterModalDelete()
      },
      error=>{
        this.alterModalMessage(error.error)
      }
    )
    }

  updateSelectedProduct(selectedProduct: Product|null):void {
  if(selectedProduct === null){
    this.alterModalMessage("Please select a product to update!")
    return;
  } 
  this.alterModalUpdate()
  
    }

alterProduct(): Promise<Product[]>{
  return new Promise((resolve,reject)=>{
    console.log('Submitted product:', JSON.stringify(this.product));
    this.productService.updateProduct(this.product === null? null : this.product)
    .subscribe(
      response => {
        console.log(`RESPONSE FROM DB IS ${JSON.stringify(response)}`)
        this.productService.getAllProducts().subscribe((products) => {
          console.log(products);
          this.products = products
          this.filteredProducts = products
          resolve(products)
        });
      },
      error =>{
        console.log(error)
        reject(error)
      }
    )
  })
  
}

handleUpdatedProduct($event: any) {
  // this.products.push($event)
  console.log($event)
  this.products = $event
  this.filteredProducts = $event
  this.isModalInsertOpen = false
  this.isModalUpdateOpen = false
}

alterModalMessage(message: string){
  this.messageToDisplay = message
  this.isModalMessageOpen = !this.isModalMessageOpen
}

handleMessageDisplayClosedEvent($event: any) {
  this.isModalMessageOpen = $event
}

}
