import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { AuthGuard } from '../auth-guard.service';

const routes: Routes = [
  {
   path: '',
   component: ReportCreateComponent,
   pathMatch: 'full'
  },
  {
   path: 'search',
   component: ReportSearchComponent,
   canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
