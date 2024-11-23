import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms'

export function dateRangeValidator(startKey: string, endKey: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const startDate = formGroup.get(startKey)?.value
        const endDate = formGroup.get(endKey)?.value

        if (!startDate || !endDate) {
            return null
        }

        const start = new Date(startDate)
        const end = new Date(endDate)

        return start <= end ? null : { dateRangeInvalid: true }
    }
}
