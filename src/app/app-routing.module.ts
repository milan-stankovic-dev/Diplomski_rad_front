import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NoteComponent } from './goods-received-note/note/note.component';
import { ReportSearchComponent } from './report/report-search/report-search.component';
import { BillOfLadingComponent } from './bill-of-lading/bill-of-lading.component';
import { AuthGuard } from './service/auth-guard.service';
import { RegisterComponent } from './register/register.component';
import { VerificationComponent } from './verification/verification.component';
 
const routes: Routes = [
  {
    path : '',
    component : HomeComponent
  },
  {
    path : 'login',
    component : LoginComponent
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'report',
    loadChildren: () => import('./report/report.module').then(m => m.ReportModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'report/search',
    component: ReportSearchComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'goods-received-note',
    component: NoteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'bill-of-lading',
    component: BillOfLadingComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'verify-email',
    component: VerificationComponent,
    data: {
      tokenQueryParam: 'token'
    },
  },
  {
    path: '**',
    component: HomeComponent,
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
