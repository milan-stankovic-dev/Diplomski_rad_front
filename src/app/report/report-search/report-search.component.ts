import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/domain/Report';
import { ReportService } from 'src/app/service/report.service';

@Component({
  selector: 'app-report-search',
  templateUrl:'./report-search.component.html',
  styleUrls:['./report-search.component.scss']
})
export class ReportSearchComponent implements OnInit{
  inputtedDate: Date
  reportList: Report[]
  selectedReport: Report

filterReports() {

}

constructor(private reportService: ReportService){}

ngOnInit(): void {
  this.reportService.getAllReports().subscribe((reports)=>{
    this.reportList = reports
    // alert(this.reportList)
    console.log(this.reportList)
  },
  error=>{
    alert(error.error)
    console.log(error)
  })
}

}
