import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportSearchComponent } from './report-search/report-search.component';

const routes: Routes = [
  {
   path: '',
   component: ReportCreateComponent,
   pathMatch: 'full'
  },
  {
   path: 'search',
   component: ReportSearchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
