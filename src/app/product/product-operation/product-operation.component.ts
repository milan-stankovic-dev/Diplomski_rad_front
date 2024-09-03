import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Partner } from 'src/app/domain/Partner';
import { Product } from 'src/app/domain/Product';
import { ProductSave } from 'src/app/domain/ProductSave';
import { ProductType } from 'src/app/domain/ProductType';
import { PartnerService } from 'src/app/service/partner.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-operation.component.html',
  styleUrls: ['./product-operation.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnChanges {

  @Input() isModalOpen: boolean = false;
  @Input() product: Product;
  @Output() filteredProducts: EventEmitter<Product[]> = new EventEmitter();
  @Input() title: string;
  @Input() buttonText: string;
  @Input() executeMethod: (() => void) | null = null;
  productTypes: Array<ProductType> = Object.values(ProductType);
  suppliers: Array<Partner> = [];
  @Output() updatedProduct: EventEmitter<any> = new EventEmitter();
  @Input() modalMethod: () => any;
  messageToDisplay: string = '';
  isModalMessageOpen: boolean = false;
  editedProduct: ProductSave;
  
  constructor(
    private productService: ProductService,
    private supplierService: PartnerService
  ) {}

  copyFieldsOfProducts(): void {
    if (this.product) {
      this.editedProduct = { 
        ...this.product, 
        supplierId: this.product.supplier?.id 
      };
    }
  }

  ngOnInit(): void {
    this.copyFieldsOfProducts();

    this.supplierService.getAllPartners().subscribe(partners => {
      this.suppliers = partners;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.editedProduct = { 
        ...changes['product'].currentValue, 
        supplierId: changes['product'].currentValue?.supplier?.id 
      };
    }
  }

  alterModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  responseToEmittableData(response: ProductSave): Product {
    const supplier = this.suppliers.find(s => s.id === response.supplierId);

    const product: Product = {
      id: response.id,
      productName: response.productName,
      weight: response.weight,
      fragile: response.fragile,
      currentStock: response.currentStock,
      minimalStock: response.minimalStock,
      orderAmount: response.orderAmount,
      type: response.type,
      price: response.price,
      supplier: supplier,
      code: null
    };

    return product;
  }

  submitProduct(form: NgForm): void {
    if (this.modalMethod) {
      this.editedProduct.supplierId = Number(this.editedProduct.supplierId);
      
      Object.assign(this.product, this.editedProduct);
      this.product.supplier = undefined;
      
      console.log("SUBMITTING: ", JSON.stringify(this.product));
      this.modalMethod().then(response => {
        
        // this.updatedProduct.emit(this.responseToEmittableData(response));
        this.alterModalMessage(`${this.buttonText} completed.`);
      }).catch(error => {
        console.error(error.error);
        this.alterModalMessage(error.error.message);
      });
    }
  }
  

  alterModalMessage(message: string) {
    this.messageToDisplay = message;
    this.isModalMessageOpen = !this.isModalMessageOpen;
  }

  handleMessageDisplayClosedEvent($event: any): void {
    this.isModalMessageOpen = $event;
  }
}
