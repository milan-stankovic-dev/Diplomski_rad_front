import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/Product';
import { ProductService } from 'src/app/service/product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  isModalOpen:boolean = false;
  products: Product[] = [];
  filteredProducts: Product[] = [];
  selectedProduct: Product | null = null;
  searchTerm = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products) => {
      console.log(products);
      this.products = products;
      this.filteredProducts = products;
    });
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
  selectProduct(product: Product): void {
    this.selectedProduct = product;
    console.log('Selected Product:', this.selectedProduct);
  }

  createProduct(product: Product): void {
    // Logic to create a product
  }
  
  filterProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.productName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}