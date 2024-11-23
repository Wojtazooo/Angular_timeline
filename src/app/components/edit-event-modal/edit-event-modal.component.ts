import { CommonModule } from '@angular/common'
import { Component, DestroyRef, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core'
import { takeUntilDestroyed } from '@angular/core/rxjs-interop'
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms'
import { ButtonModule } from 'primeng/button'
import { CalendarModule } from 'primeng/calendar'
import { DialogModule } from 'primeng/dialog'
import { DropdownModule } from 'primeng/dropdown'
import { FloatLabelModule } from 'primeng/floatlabel'
import { InputTextModule } from 'primeng/inputtext'
import { CategoryModel } from '../../models/category-model'
import { EventModel } from '../../models/event-model'
import { CategoriesRepository } from '../../services/categories-repository.service'
import { dateRangeValidator } from '../../validators/dateRangeValidators'

@Component({
    selector: 'app-edit-event-modal',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        DialogModule,
        DropdownModule,
        ButtonModule,
        CalendarModule,
        InputTextModule,
        FloatLabelModule,
        CommonModule,
    ],
    templateUrl: './edit-event-modal.component.html',
})
export class EditEventModalComponent implements OnChanges {
    @Input({ required: true }) visible: boolean = false
    @Input({ required: true }) eventToEdit: EventModel | undefined
    @Output() onClose: EventEmitter<void> = new EventEmitter()
    @Output() onSave: EventEmitter<EventModel> = new EventEmitter<EventModel>()

    protected form: FormGroup
    protected categories: CategoryModel[] = []

    constructor(
        readonly categoriesRepository: CategoriesRepository,
        destroyRef: DestroyRef,
        formBuilder: FormBuilder
    ) {
        categoriesRepository
            .getCategories()
            .pipe(takeUntilDestroyed(destroyRef))
            .subscribe((categories) => {
                this.categories = categories
            })

        this.form = formBuilder.group(
            {
                name: new FormControl('', Validators.required),
                start: new FormControl(undefined, Validators.required),
                end: new FormControl(undefined, [Validators.required]),
                description: new FormControl(),
                imageUrl: new FormControl(),
                category: new FormControl(undefined, Validators.required),
            },
            { validator: dateRangeValidator('start', 'end') }
        )
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['eventToEdit']) {
            this.form.patchValue({
                name: this.eventToEdit?.name,
                start: this.eventToEdit?.start,
                end: this.eventToEdit?.end,
                category: this.eventToEdit?.category,
                description: this.eventToEdit?.description,
                imageUrl: this.eventToEdit?.imageUrl,
            })
        }
    }

    handleOnHide() {
        this.form.reset()
        this.onClose.emit()
    }

    handleOnSave() {
        Object.keys(this.form.controls).forEach((key) => {
            this.form.get(key)?.markAsDirty()
        })
        this.form.markAllAsTouched()
        if (this.form.invalid) {
            return
        }

        const event: EventModel = {
            id: this.eventToEdit?.id,
            ...this.form.value,
        }
        this.form.reset()
        this.onSave.emit(event)
    }

    handleOnCanel() {
        this.onClose.emit()
    }
}
