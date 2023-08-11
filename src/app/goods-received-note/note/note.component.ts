import { Component, OnInit } from '@angular/core';
import { Firm } from 'src/app/domain/Firm';
import { GoodsReceivedNote } from 'src/app/domain/GoodsReceivedNote';
import { GoodsReceivedNoteItem } from 'src/app/domain/GoodsReceivedNoteItem';
import { Partner } from 'src/app/domain/Partner';
import { Product } from 'src/app/domain/Product';
import { FirmService } from 'src/app/service/firm.service';
import { GoodsReceivedNoteService } from 'src/app/service/goods-received-note.service';
import { PartnerService } from 'src/app/service/partner.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss']
})
export class NoteComponent implements OnInit{
  products: Product[]
  partners: Partner[]
  firms: Firm[]
  selectedIssueDate: Date
  selectedDueDate: Date
  selectedProduct: Product;
  goodsReceivedNoteItems: GoodsReceivedNoteItem[] = []
  selectedItem: GoodsReceivedNoteItem
  setOrderAmountModal: boolean = false
  amountToOrder: number
  totalCost: number = 0
  newNote: GoodsReceivedNote
  selectedFirm: Firm
  selectedPartner: Partner

  constructor(private productService: ProductService,
    private partnerService: PartnerService, 
    private firmService: FirmService,
    private noteService: GoodsReceivedNoteService){}

  ngOnInit(): void {
    this.productService.getAllProducts().subscribe((products)=>{
      this.products = products
    },
    error=>{
      alert(error.error)
      console.log(error)
    }
    )
    this.firmService.getAllFirms().subscribe((firms)=>{
      this.firms = firms
    },
    error=>{
      alert(error.error)
      console.log(error)
    }
    )
    this.partnerService.getAllPartners().subscribe((partners)=>{
      this.partners = partners
    },
    error=>{
      alert(error.error)
      console.log(error)
    }
    )

  }

  addNewItem(productToAdd: Product): void {
    if (!productToAdd) {
      alert("Please select a valid product to add as a note item.");
      return;
    }
  
    if (this.contains(productToAdd, this.goodsReceivedNoteItems)) {
      alert("Product item already exists in the list.");
    } else {
      const itemToAdd: GoodsReceivedNoteItem = {
        id: 0,
        amountOrdered: 0,
        product: productToAdd
      };
      this.goodsReceivedNoteItems.push(itemToAdd);
      alert("Product added successfully.");
    }
  }
  

  contains(product: Product, arrayOfItems: GoodsReceivedNoteItem[]): boolean {
    return arrayOfItems.some(item => item.product.id === product.id);
  }
  

  // productsEqual(product1: Product, product2: Product):boolean{
  //   alert("Product 1: " + product1)
  //   alert("Product 2: " + product2)
  //     if(product1.productName === product2.productName &&
  //       product1.amount === product2.amount && product1.price === product2.price &&
  //       product1.type === product2.type && product1.fragile === product2.fragile &&
  //       product1.weight === product2.weight){
  //         alert("Product 1 name: " + product1.productName)
  //         alert("Product 2 name: " + product2.productName)
  //         alert("Products equal... satisfied that " + JSON.stringify(product1)
  //         + " and " + JSON.stringify(product2) + " are equal!")
  //       return true 
  //       }
  //       return false  
  // }
  selectItem(selectedItem: GoodsReceivedNoteItem) {
    this.selectedItem = selectedItem
  }

  deleteSelectedItem(selectedItem: GoodsReceivedNoteItem) {
    if(selectedItem === undefined){
      alert("Please select an item to delete.")
      return;
    }
    this.goodsReceivedNoteItems.splice(this.goodsReceivedNoteItems.indexOf(selectedItem),1)
    alert("Item removed successfully!")
    this.totalCost = this.calculateTotalCost()
  }
    
  changeAmountOrdered() {
    if(this.setOrderAmountModal)
    this.setOrderAmountModal = false
    else 
    this.setOrderAmountModal = true
  }

  setOrderAmountForProductInItem(item: GoodsReceivedNoteItem,amountOrdered: number): void{
    if(item === undefined || amountOrdered === undefined){
      return
    }
    const foundIndexOfItemToAlter = this.goodsReceivedNoteItems.indexOf(item)
    this.goodsReceivedNoteItems[foundIndexOfItemToAlter].amountOrdered = amountOrdered

    this.totalCost = this.calculateTotalCost()
    this.changeAmountOrdered()
  }
  calculateTotalCost() :number {
    let totalCost = 0
    for(const item of this.goodsReceivedNoteItems){
      totalCost+= (item.amountOrdered * item.product.price)
    }

    return totalCost
  }

  submitNote(arg0: any) {
    try{
      this.validateNote();
      const note = this.createNote()

      this.insertNote(note)

    }catch(error){
      alert(error.error)
    }
  }

  insertNote(note: GoodsReceivedNote):void {
    console.log(note)
    alert(JSON.stringify(note))
    this.noteService.insertNote(note).subscribe(
      response=>{
        alert("Note successfully inserted!")
        console.log(response)
      },
      error => {
        alert(error.error)
        console.log(error)
      }
    )

  }

  createNote() :GoodsReceivedNote{
    let note: GoodsReceivedNote = {
      id: 0,
      deadLine: this.selectedDueDate,
      totalCost: this.totalCost,
      partner: this.selectedPartner,
      items: this.goodsReceivedNoteItems
    }
    return note
  }
  validateNote() :void{
    this.noteHasItems()
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
      this.selectedPartner === undefined || 
      this.selectedDueDate === undefined || 
      this.selectedIssueDate === undefined ){
        throw new Error('Please fill in all required fields.')
      }
  }

  totalCostIsNotZero():void {
    if(this.totalCost === undefined || this.totalCost <= 0)
      throw new Error('You may not order zero products.');
  }

  noteHasItems():void {
    if(this.goodsReceivedNoteItems === undefined ||
      this.goodsReceivedNoteItems.length === 0)
    throw new Error('Please input products for ordering before saving your goods received note.');
  }

  
    
}