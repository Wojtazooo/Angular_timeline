import { CommonModule } from '@angular/common';
import { Component, DestroyRef, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { CategoryModel } from '../../../../models/category-model';
import { CategoriesRepository } from '../../../../services/categories-repository.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { EventModel } from '../../../../models/event-model';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-modal',
  standalone: true,
  imports: [ReactiveFormsModule, DialogModule, DropdownModule, ButtonModule, CalendarModule, InputTextModule, FloatLabelModule, CommonModule],
  templateUrl: './create-event-modal.component.html',
  styleUrl: './create-event-modal.component.scss'
})
export class CreateEventModalComponent {
  @Input({required: true}) visible: boolean = false;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onSave: EventEmitter<EventModel> = new EventEmitter<EventModel>();

  protected categories: CategoryModel[] = [];
  protected form: FormGroup;

  constructor(readonly categoriesRepository: CategoriesRepository, destroyRef: DestroyRef, formBuilder: FormBuilder) {
    categoriesRepository.getCategories().pipe(takeUntilDestroyed(destroyRef)).subscribe(categories => {
      this.categories = categories;
    })
    this.form = formBuilder.group({
      name: new FormControl(undefined, Validators.required),
      start: new FormControl(),
      end: new FormControl(),
      description: new FormControl(),
      imageUrl: new FormControl(),
      category: new FormControl()
    })
  }

  handleOnSave() {
    const event: EventModel = {
      id: crypto.randomUUID(),
      ...this.form.value
    }
    this.form.reset();
    this.onSave.emit(event);
  }

  handleOnCanel() {
    this.onClose.emit();
  }

  handleOnHide() {
    this.onClose.emit();
  }
}
