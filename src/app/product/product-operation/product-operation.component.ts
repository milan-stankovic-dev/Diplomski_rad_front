import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Partner } from 'src/app/domain/Partner';
import { Product } from 'src/app/domain/Product';
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
  insertForm: FormGroup;
  @Input() product: Product;
  @Output() filteredProducts: EventEmitter<Product[]> = new EventEmitter();
  @Input() title: string;
  @Input() buttonText: string;
  @Input() executeMethod: (() => void) | null = null;
  productTypes: Array<ProductType> = Object.values(ProductType);
  suppliers: Array<Partner>;
  @Output() updatedProduct: EventEmitter<any> = new EventEmitter();
  @Input() modalMethod: () => any;
  messageToDisplay: string = '';
  isModalMessageOpen: boolean = false;
  editedProduct: Product;
  supplierId: number;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private supplierService: PartnerService
  ) {}

  ngOnInit(): void {
    this.editedProduct = { ...this.product };
    this.supplierId = this.editedProduct.supplier?.id;

    this.insertForm = this.formBuilder.group({
      productName: [this.editedProduct.productName, [Validators.required]],
      weight: [this.editedProduct.weight, [Validators.required, Validators.min(1)]],
      fragile: [this.editedProduct.fragile, [Validators.required]],
      amount: [this.editedProduct.currentStock, [Validators.required, Validators.min(0)]],
      minimalStock: [this.editedProduct.minimalStock, [Validators.required, Validators.min(0)]],
      orderAmount: [this.editedProduct.orderAmount, [Validators.required, Validators.min(0)]],
      type: [this.editedProduct.type, [Validators.required]],
      price: [this.editedProduct.price, [Validators.required, Validators.min(1)]],
      supplier: [this.supplierId, [Validators.required]],
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
      this.editedProduct.currentStock = value;
    });
    this.insertForm.get('minimalStock').valueChanges.subscribe((value) => {
      this.editedProduct.minimalStock = value;
    });
    this.insertForm.get('supplier').valueChanges.subscribe((value) => {
      this.supplierId = value;
      this.editedProduct.supplier = this.suppliers.find(supplier => supplier.id === value);
    });
    this.insertForm.get('orderAmount').valueChanges.subscribe((value) => {
      this.editedProduct.orderAmount = value;
    });
    this.insertForm.get('type').valueChanges.subscribe((value) => {
      this.editedProduct.type = value;
    });
    this.insertForm.get('price').valueChanges.subscribe((value) => {
      this.editedProduct.price = value;
    });
    
    this.supplierService.getAllPartners().subscribe(partners => {
       console.log(partners);
       this.suppliers = partners;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const selectedSupplierId = this.insertForm.get('supplier')?.value;
    console.log('SELECTED ID::::', selectedSupplierId)
    if (changes['product'] && changes['product'].currentValue) {
      this.editedProduct = { ...changes['product'].currentValue };
      this.insertForm.patchValue({
        ...this.editedProduct,
        supplier: this.editedProduct.supplier?.id || ''
      });
    }
  }

  alterModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  submitProduct(): void {
    console.log("edited product", this.editedProduct);
    console.log("product",this.product);
    if (this.modalMethod) {
      Object.assign(this.product, this.editedProduct);
      this.modalMethod().then(response => {
        this.updatedProduct.emit(response);
        this.alterModalMessage(`${this.buttonText} completed.`);
      }).catch(error => {
        console.error(error.error);
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
