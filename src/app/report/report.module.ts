import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportSearchComponent } from './report-search/report-search.component';


@NgModule({
  declarations: [
    ReportCreateComponent,
    ReportSearchComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
