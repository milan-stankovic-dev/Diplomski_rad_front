
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductUpdateComponent } from './product-update/product-update.component';

import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductInsertModalComponent } from './product-insert/product-insert-modal.component';


@NgModule({
  declarations: [
    ProductListComponent,
    ProductSearchComponent,
    ProductUpdateComponent,
    ProductInsertModalComponent,
    ProductDeleteComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ProductModule { }
