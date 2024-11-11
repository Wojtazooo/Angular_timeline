import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [DialogModule, ButtonModule, CalendarModule, InputTextModule, FloatLabelModule, CommonModule],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.scss'
})
export class CreateEventModalComponent {
  @Input({required: true}) visible: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  handleOnSave() {

  }

  handleOnCanel() {
    this.onClose.emit();
  }

  handleOnHide() {
    this.onClose.emit();
  }
}
