import { NgModule } from '@angular/core';
import { ModalMessageComponent } from './modal-message/modal-message.component';
import { CommonModule } from '@angular/common';

@NgModule({
  imports:[CommonModule],
  declarations: [ModalMessageComponent],
  exports: [ModalMessageComponent]
})
export class SharedModule { }
