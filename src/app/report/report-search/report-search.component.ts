import { Component, OnInit } from '@angular/core';
import { Report } from 'src/app/domain/Report';
import { ReportService } from 'src/app/service/report.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'app-report-search',
  templateUrl:'./report-search.component.html',
  styleUrls:['./report-search.component.scss'],
  providers: [BsDatepickerConfig]
})
export class ReportSearchComponent implements OnInit{

  inputtedDate: Date
  reportList: Report[]
  selectedReport: Report | null = null
  foundReportsList: Report[]

  findReportsByDate(dateForSearch: Date):void{
    if(dateForSearch === undefined){
      alert("Please input a valid date for search.")
      return;
    }
    let foundReports: Report[] = []
    for(const report of this.reportList){
      if(this.areDatesEqual(new Date(report.reportDate), dateForSearch)){
      foundReports.push(report)
      }
    }

    this.foundReportsList = foundReports
    
    if(foundReports.length === 0){
      alert("No reports found for your query!")
    }else{
      this.selectedReport = foundReports[0];
      alert(`found ${foundReports.length} reports for your query!`)
    }
  }
  
  areDatesEqual(date1: Date, date2: Date) {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
constructor(private reportService: ReportService){}

ngOnInit(): void {
  this.reportService.getAllReports().subscribe((reports)=>{
    this.reportList = reports
    this.foundReportsList = reports
    // alert(this.reportList)
    console.log(reports)
  },
  error=>{
    alert(error.error)
    console.log(error)
  })
}

}
