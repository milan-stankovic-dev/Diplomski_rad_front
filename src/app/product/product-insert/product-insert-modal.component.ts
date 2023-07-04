import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-insert-modal',
  templateUrl: './product-insert-modal.component.html',
  styleUrls: ['./product-insert-modal.component.css'],
  // standalone:true
})
export class ProductInsertModalComponent {
  @Output() insertProduct = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      productName: ['', Validators.required],
      weight: ['', Validators.required],
      fragile: [false],
      amount: ['', Validators.required],
      productType: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      this.insertProduct.emit(this.productForm.value);
      this.closeModal();
    }
  }

  closeModal(): void {
    this.close.emit();
  }
}
