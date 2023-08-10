import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-insert-modal',
  templateUrl: './product-insert-modal.component.html',
  styleUrls: ['./product-insert-modal.component.css'],
})
export class ProductInsertModalComponent {
  @Output() insertProduct = new EventEmitter<any>();
  @Output() close = new EventEmitter<void>();

  productForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.productForm = this.formBuilder.group({
      productName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(30)]],
      weight: ['', [Validators.required, Validators.min(0)]],
      fragile: [false],
      amount: ['', [Validators.required, Validators.min(1)]],
      productType: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]]
    });
  }

  createProduct(): void {
    if (this.productForm.valid) {
      this.insertProduct.emit(this.productForm.value);
      this.closeModal();
    }
  }

  openModal(): void {
    console.log('Modal opened');
  }

  closeModal(): void {
    console.log('Modal closed');
  }
}
