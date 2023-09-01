import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/domain/Product';
import { ProductType } from 'src/app/domain/ProductType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-operation.component.html',
  styleUrls: ['./product-operation.component.scss']
})
export class ProductUpdateComponent implements OnInit, OnChanges {

  @Input() isModalOpen: boolean = false;
  insertForm: FormGroup;
  @Input() product: Product;
  @Output() filteredProducts: EventEmitter<Product[]> = new EventEmitter();
  @Input() title: string;
  @Input() buttonText: string;
  @Input() executeMethod: (() => void) | null = null;
  productTypes: Array<ProductType> = Object.values(ProductType);
  @Output() updatedProduct: EventEmitter<any> = new EventEmitter();
  @Input() modalMethod: () => any;
  messageToDisplay: string = '';
  isModalMessageOpen: boolean = false;
  editedProduct: Product;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.editedProduct = { ...this.product };
    this.insertForm = this.formBuilder.group({
      productName: [this.editedProduct.productName, [Validators.required]],
      weight: [this.editedProduct.weight, [Validators.required, Validators.min(1)]],
      fragile: [this.editedProduct.fragile, [Validators.required]],
      amount: [this.editedProduct.amount, [Validators.required, Validators.min(0)]],
      type: [this.editedProduct.type, [Validators.required]],
      price: [this.editedProduct.price, [Validators.required, Validators.min(1)]],
    });

    this.insertForm.get('productName').valueChanges.subscribe((value) => {
      this.editedProduct.productName = value;
    });
    this.insertForm.get('weight').valueChanges.subscribe((value) => {
      this.editedProduct.weight = value;
    });
    this.insertForm.get('fragile').valueChanges.subscribe((value) => {
      this.editedProduct.fragile = value;
    });
    this.insertForm.get('amount').valueChanges.subscribe((value) => {
      this.editedProduct.amount = value;
    });
    this.insertForm.get('type').valueChanges.subscribe((value) => {
      this.editedProduct.type = value;
    });
    this.insertForm.get('price').valueChanges.subscribe((value) => {
      this.editedProduct.price = value;
    });
    
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && changes['product'].currentValue) {
      this.editedProduct = { ...changes['product'].currentValue };
      this.insertForm.patchValue(this.editedProduct);
    }
  }

  alterModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  submitProduct(): void {
    if (this.modalMethod) {
      Object.assign(this.product, this.editedProduct);
      this.modalMethod().then(response => {
        this.updatedProduct.emit(response);
        this.alterModalMessage(`${this.buttonText} completed.`);
      }).catch(error => {
        console.error(error);
        this.alterModalMessage(error.error);
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
