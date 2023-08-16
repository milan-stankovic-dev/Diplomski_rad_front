import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/domain/Product';
import { Report } from 'src/app/domain/Report';
import { ReportItem } from 'src/app/domain/ReportItem';
import { ProductService } from 'src/app/service/product.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { ReportService } from 'src/app/service/report.service';

// import { NgModule } from '@angular/core';

@Component({
  selector: 'app-report-create',
  templateUrl: './report-create.component.html',
  styleUrls: ['./report-create.component.scss']
})
export class ReportCreateComponent implements OnInit{
    // isInsertModal: boolean = false
    newReport: Report
    reports: Report[]
    searchDate: Date
    products: Product[] = []
    isCapacityModal: boolean = false
    globalCap: number
    isSingleChangeModal: boolean = false
    newSingleProductCap: number
    selectedItem: ReportItem
    selectedItemIndex: number
    singleCap: number
    displayMessage: string = ''
    isModalMessageOpen: boolean = false
    // dummy: any
    // filterReports():void{

    // }
    constructor(private productService:ProductService,
      private reportService: ReportService){}

    insertReport(report:Report):void{
      if(report === null || report.reportItems.length === 0){
        // alert("Report cannot be created. There are no items.")
        this.alterMessageModal("Report cannot be created. There are no items.")
        return
      }

      this.reportService.insertReport(report).subscribe((response)=>{
        this.alterMessageModal("Report inserted successfully!")
        // alert("Report inserted successfully!")
      },
      error=>{
        // alert(error.error)
        this.alterMessageModal(error.error)
        console.log(error)
      })
    }

  hasDecimalPlaces(number: number): boolean {
    const numberAsString = number.toString();
    return numberAsString.includes('.');
  }

  turnDecimalIntoPercentageForAllItems(reportItems: ReportItem[]) {
    for(const item of reportItems){
      item.productCapacity = this.turnDecimalIntoPercentage(item.productCapacity)
    }
  }

  turnDecimalIntoPercentage(totalCapacity: number) {
    return totalCapacity * 100
  }

    ngOnInit(): void {
      this.newReport = {
        id:0,
        reportDate: new Date(),
        totalCapacity: 100,
        reportItems: []
      }
      
      this.productService.getAllProducts().subscribe((products)=>{
          console.log(products)
          
          this.products = products
          this.newReport = this.createReportItems(this.newReport)
          this.newReport.totalCapacity = this.calculateTotalReportCapacity(this.newReport)
          this.newReport.reportDate = new Date()
      },
      error => {
        console.log(error)
        // alert(error.error)
        this.alterMessageModal(error.error)
      }
      )


    }
    calculateTotalReportCapacity(newReport: Report): number {
      let totalGrossAvailableCapacity: number = 0
      let totalGrossUsedCapacity: number = 0

      for(const item of newReport.reportItems){
        totalGrossAvailableCapacity+= item.totalAvailableCapacity
        totalGrossUsedCapacity+= item.product.amount
      }
      
      return Number((100  - (100 * totalGrossUsedCapacity)/totalGrossAvailableCapacity).toFixed(2))
    }
  

    createReportItems(report: Report): Report{
        // alert(JSON.stringify(this.products))
        for(const product of this.products){
          const item: ReportItem = {
            id: 0,
            productCapacity: this.calcTotalAvailableCapacityForProduct(product, 200),
            product: product,
            totalAvailableCapacity: 200
          }
          report.reportItems.push(item)
        }
        return report
    }
  calcTotalAvailableCapacityForProduct(product: Product, capacity: number): number {
      return 100 - (100 * product.amount/capacity)
  } 

  openCapacityUpdateModal():void{
    this.isCapacityModal = !this.isCapacityModal
  }

  commitToGlobalChangeInCapacity(value: number){
    for(const item of this.newReport.reportItems){
      if(item.product.amount>value){
        // alert("Given capacity too low.")
        this.alterMessageModal("Given capacity too low.")
        return;
      }
      item.productCapacity = this.calcTotalAvailableCapacityForProduct(item.product,value)
      item.totalAvailableCapacity = value
    }
    this.newReport.totalCapacity = this.calculateTotalReportCapacity(this.newReport)
    this.alterCapacityModal()
  }

  alterCapacityModal():void{
   this.isCapacityModal = !this.isCapacityModal
  }

  alterSingleChangeModal():void{
   this.isSingleChangeModal = !this.isSingleChangeModal
  }

  changeSingleProductCapacity(item: ReportItem): void{
    this.alterSingleChangeModal()
    this.selectedItemIndex = this.newReport.reportItems.indexOf(item)
    this.selectedItem = item
  }

  commitToSingleCapChange(itemCapacity: number): void{
    if(itemCapacity < this.selectedItem.product.amount){
      return
    }
    this.selectedItem.totalAvailableCapacity = itemCapacity
    this.newReport.reportItems.splice(this.selectedItemIndex, 1, this.selectedItem)

    this.newReport.reportItems[this.selectedItemIndex].productCapacity = 
    this.calcTotalAvailableCapacityForProduct(this.selectedItem.product, itemCapacity)
    this.newReport.totalCapacity = this.calculateTotalReportCapacity(this.newReport)
    

    this.alterSingleChangeModal()
  }

  alterMessageModal(message: string){
    this.displayMessage = message
    this.isModalMessageOpen = !this.isModalMessageOpen
  }

}
