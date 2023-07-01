import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductInsertComponent } from './product-insert/product-insert.component';
import { ProductUpdateComponent } from './product-update/product-update.component';
import { ProductDeleteComponent } from './product-delete/product-delete.component';
import { ProductSearchComponent } from './product-search/product-search.component';

const routes: Routes = [
    {
     path: '',
     component: ProductListComponent,
     pathMatch: 'full'
    },
    {
     path: 'insert',
     component: ProductInsertComponent
    },
    {
      path: 'update',
      component: ProductUpdateComponent
    },
    {
      path: 'delete',
      component: ProductDeleteComponent
    },
    {
      path: 'search',
      component: ProductSearchComponent
    },
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
