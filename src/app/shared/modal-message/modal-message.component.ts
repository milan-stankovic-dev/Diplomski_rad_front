import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-message',
  templateUrl:'./modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent {
  @Input() displayMessage: string
  isModalOpen: boolean = true
  @Output() modalClosed = new EventEmitter<boolean>()

  alterModalState() :void{
    this.isModalOpen = !this.isModalOpen
    this.modalClosed.emit(this.isModalOpen)
  }
}
