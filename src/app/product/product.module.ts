
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
// import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-operation/product-operation.component';

// import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductInsertModalComponent } from './product-insert/product-insert-modal.component';
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductUpdateComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ProductRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[
    // ModalMessageComponent
  ]
})
export class ProductModule { }
