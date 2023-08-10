import { Component, OnInit } from '@angular/core';
import { Firm } from 'src/app/domain/Firm';
import { Partner } from 'src/app/domain/Partner';
import { Product } from 'src/app/domain/Product';
import { FirmService } from 'src/app/service/firm.service';
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
  selectedDate: Date;

  constructor(private productService: ProductService,
    private partnerService: PartnerService, 
    private firmService: FirmService){}

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
}