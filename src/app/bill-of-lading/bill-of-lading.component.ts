import { Component, OnInit } from '@angular/core';
import { Firm } from 'src/app/domain/Firm';
import { Product } from 'src/app/domain/Product';
import { FirmService } from 'src/app/service/firm.service';
import { ProductService } from 'src/app/service/product.service';
import { LegalPerson } from '../domain/LegalPerson';
import { NaturalPerson } from '../domain/NaturalPerson';
import { LegalPersonService } from '../service/legal-person.service';
import { NaturalPersonService } from '../service/natural-person.service';
import { BillOfLading } from '../domain/BillOfLading';
import { BillOfLadingItem } from '../domain/BillOfLadingItem';
import { BillOfLadingService } from '../service/bill-of-lading.service';

@Component({
  selector: 'app-note',
  templateUrl: './bill-of-lading.component.html',
  styleUrls: ['./bill-of-lading.component.scss']
})
export class BillOfLadingComponent implements OnInit{

  products: Product[]
  naturalPersons: NaturalPerson[]
  legalPersons: LegalPerson[]
  firms: Firm[]
  selectedIssueDate: Date
  selectedDueDate: Date
  selectedProduct: Product;
  billOfLadingItems: BillOfLadingItem[] = []
  selectedItem: BillOfLadingItem
  setOrderAmountModal: boolean = false
  amountToOrder: number
  totalCost: number = 0
  newBill: BillOfLading
  selectedFirm: Firm
  selectedNaturalPerson: NaturalPerson
  selectedLegalPerson: LegalPerson
  isNaturalPersonSelected: boolean = true
  isModalMessageOpen: boolean = false;
  displayMessage: string = ''

  constructor(private productService: ProductService,
    private legalPersonService: LegalPersonService, 
    private naturalPersonService: NaturalPersonService,
    private firmService: FirmService,
    private billService: BillOfLadingService){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products)=>{
      this.products = products
    },
    error=>{
      // alert(error.error)
      this.alterModalMessage(error.error)
      console.log(error)
    }
    )
    this.firmService.getAllFirms().subscribe((firms)=>{
      this.firms = firms
    },
    error=>{
      // alert(error.error)
      this.alterModalMessage(error.error)
      console.log(error)
    }
    )
    this.naturalPersonService.getAllNaturalPersons().subscribe((persons)=>{
      this.naturalPersons = persons
    },
    error=>{
      // alert(error.error)
      this.alterModalMessage(error.error)
      console.log(error)
    }
    )
    this.legalPersonService.getAllLegalPersons().subscribe((persons)=>{
      this.legalPersons = persons
    },
    error=>{
      // alert(error.error)
      this.alterModalMessage(error.error)
      console.log(error)
    }
    )
  }

  addNewItem(productToAdd: Product): void {
    if (!productToAdd) {
      // alert("Please select a valid product to add as a note item.");
      this.alterModalMessage("Please select a valid product to add as a note item.")
      return;
    }
  
    if (this.contains(productToAdd, this.billOfLadingItems)) {
      // alert("Product item already exists in the list.");
      this.alterModalMessage("Product item already exists in the list.")
    } else {
      const itemToAdd: BillOfLadingItem = {
        id: 0,
        amountSold: 0,
        product: productToAdd
      };
      this.billOfLadingItems.push(itemToAdd);
      // alert("Product added successfully.");
      this.alterModalMessage("Product added successfully.")
    }
  }
  

  contains(product: Product, arrayOfItems: BillOfLadingItem[]): boolean {
    return arrayOfItems.some(item => item.product.id === product.id);
  }
  
  selectItem(selectedItem: BillOfLadingItem) {
    this.selectedItem = selectedItem
  }

  deleteSelectedItem(selectedItem: BillOfLadingItem) {
    if(selectedItem === undefined){
      // alert("Please select an item to delete.")
      this.alterModalMessage("Please select an item to delete.")
      return;
    }
    this.billOfLadingItems.splice(this.billOfLadingItems.indexOf(selectedItem),1)
    // alert("Item removed successfully!")
    this.alterModalMessage("Item removed successfully!")
    this.totalCost = this.calculateTotalCost()
    this.selectedItem = undefined
  }
    
  changeAmountOrdered() {
    if(this.setOrderAmountModal)
    this.setOrderAmountModal = false
    else 
    this.setOrderAmountModal = true
  }

  setOrderAmountForProductInItem(item: BillOfLadingItem,amountSold: number): void{
    if(item === undefined || amountSold === undefined){
      return
    }
    const foundIndexOfItemToAlter = this.billOfLadingItems.indexOf(item)
    this.billOfLadingItems[foundIndexOfItemToAlter].amountSold = amountSold

    this.totalCost = this.calculateTotalCost()
    this.changeAmountOrdered()
  }
  calculateTotalCost() :number {
    let totalCost = 0
    for(const item of this.billOfLadingItems){
      totalCost+= (item.amountSold * item.product.price)
    }

    return totalCost
  }

  submitBill(bill: BillOfLading) {
    // alert(JSON.stringify(bill))
    try{
      this.validateBill();
      const bill = this.createBill()

      this.insertBill(bill)

    }catch(error){
      // alert(error)
      this.alterModalMessage(error)
    }
  }

  insertBill(bill: BillOfLading):void {
    console.log(bill)
    // alert(JSON.stringify(bill))
    this.billService.insertBill(bill).subscribe(
      response=>{
        // alert("Bill successfully inserted!")
        this.alterModalMessage("Bill successfully inserted!")
        console.log(response)
      },
      error => {
        // alert(error.error)
        this.alterModalMessage(error.error)
        console.log(error)
      }
    )

  }

  createBill() :BillOfLading{
    let bill: BillOfLading = {
      id: 0,
      deadLine: this.selectedDueDate,
      issueDate: this.selectedIssueDate,
      totalCost: this.totalCost,
      buyer : this.isNaturalPersonSelected?
       this.selectedNaturalPerson: this.selectedLegalPerson,
      items: this.billOfLadingItems
    }
    return bill
  }
  validateBill() :void{
    this.billHasItems()
    this.totalCostIsNotZero()
    this.allFieldsAreSet()
    this.datesAreWellSet()
  }
  datesAreWellSet() {
    if(this.selectedIssueDate === undefined ||
      this.selectedDueDate === undefined)
      throw new Error('Please define both the issue date and the due date.')

      if(this.selectedIssueDate >= this.selectedDueDate){
        throw new Error('Issue date may only be set before due date.')
      }
  }

  allFieldsAreSet():void {
    if(this.selectedFirm === undefined ||
      (this.selectedLegalPerson === undefined 
      && this.selectedNaturalPerson === undefined) || 
      this.selectedDueDate === undefined || 
      this.selectedIssueDate === undefined ){
        throw new Error('Please fill in all required fields.')
      }
  }

  totalCostIsNotZero():void {
    if(this.totalCost === undefined || this.totalCost <= 0)
      throw new Error('You may not order zero products.');
  }

  billHasItems():void {
    if(this.billOfLadingItems === undefined ||
      this.billOfLadingItems.length === 0)
    throw new Error('Please input products for ordering before saving your bill of lading.');
  }

  personTypeSwitch():void {
    if(this.isNaturalPersonSelected){
      this.isNaturalPersonSelected = false
    }
    else 
    this.isNaturalPersonSelected = true
  }
    
  alterModalMessage(message : string): void{
    this.displayMessage = message
    this.isModalMessageOpen = !this.isModalMessageOpen
  }

  handleModalClosedEvent($event: boolean) {
    this.isModalMessageOpen = $event
  }
}