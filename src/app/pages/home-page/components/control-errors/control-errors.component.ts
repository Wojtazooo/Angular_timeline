import { NgIf } from '@angular/common'
import { Component, Input } from '@angular/core'
import { AbstractControl } from '@angular/forms'
import { first } from 'rxjs'

@Component({
    selector: 'app-control-errors',
    standalone: true,
    imports: [NgIf],
    template: `<small class="p-error block" *ngIf="control?.invalid && control?.touched">
        {{ getErrorMessage() }}
    </small>`,
})
export class ControlErrorsComponent {
    @Input({ required: true }) control: AbstractControl | null = null
    @Input({ required: true }) fieldName: string = ''

    getErrorMessage(): string {
        if (this.control && this.control.errors && Object.keys(this.control.errors).length > 0) {
            const firstError = this.control.errors[0]
            switch (firstError) {
                case 'required':
                    ;`${this.fieldName} is required`
            }
        }
        return ''
    }
}
