import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';

import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductSearchComponent } from './product-search/product-search.component';
import { ProductInsertModalComponent } from './product-insert/product-insert-modal.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
    {
     path: '',
     component: ProductListComponent,
     pathMatch: 'full'
    }
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
