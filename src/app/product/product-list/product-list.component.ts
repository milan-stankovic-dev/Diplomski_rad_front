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
  alert("Success!")
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

  @Output() reactiveProductList: Product[]

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

  submitProduct(): Promise<Product> {
    return new Promise((resolve, reject) =>{
      console.log('Submitted product:', JSON.stringify(this.product));
      alert(JSON.stringify(this.product))
      this.productService.insertProduct(this.product)
      .subscribe(
        response => {
          alert("Saved in database!")
          this.productService.getAllProducts().subscribe((products) => {
            console.log(products);
            this.products = products;
            this.filteredProducts = products;
            resolve(response)
          });
          this.alterModalInsert()
        },
        error =>{
          reject(error)
          alert(error.error)
          this.alterModalInsert()

        }
      )
    })
    
  }

  deleteProduct(product: Product| null) {
    if(product === null){
      this.alterModalDelete();
      alert("Please select a product for deletion.")
      return;
    }
    this.productService.deleteProduct(this.selectedProduct === null? null : this.selectedProduct.id)
    .subscribe(
      response=>{
        alert("Deleted product")
        this.productService.getAllProducts().subscribe((products) => {
          console.log(products);
          this.products = products;
          this.filteredProducts = products;
        });
        this.alterModalDelete()
      },
      error=>{
        alert(error.error)
      }
    )
    }

  updateSelectedProduct(selectedProduct: Product|null):void {
  if(selectedProduct === null){
    alert("Please select a product to update!")
    return;
  } 
  this.alterModalUpdate()
  
    }

alterProduct(){
  console.log('Submitted product:', JSON.stringify(this.product));
  this.productService.updateProduct(this.product === null? null : this.product)
  .subscribe(
    response => {
      alert("Updated in database!")
      console.log(`RESPONSE FROM DB IS ${JSON.stringify(response)}`)
      this.productService.getAllProducts().subscribe((products) => {
        alert("RESPONSE CAME")
        alert(JSON.stringify(products))
        console.log(products);
        this.products = products
        this.filteredProducts = products
      });
      this.alterModalInsert()
      
    },
    error =>{
      console.log(error)
      alert(error.error)
      this.alterModalInsert()
    }
  )
  
}

handleUpdatedProduct($event: Product) {
  this.products.push($event)
  console.log($event)
}

}
