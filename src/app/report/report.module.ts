import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// import { ReportRoutingModule } from './report-routing.module';
import { ReportCreateComponent } from './report-create/report-create.component';
import { ReportSearchComponent } from './report-search/report-search.component';
import { FormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportRoutingModule } from './report-routing.module';


@NgModule({
  declarations: [
    ReportCreateComponent,
    ReportSearchComponent
  ],
  imports: [
    FormsModule,
    ReportRoutingModule,
    CommonModule,
    BsDatepickerModule.forRoot()
  ]
})
export class ReportModule { }
