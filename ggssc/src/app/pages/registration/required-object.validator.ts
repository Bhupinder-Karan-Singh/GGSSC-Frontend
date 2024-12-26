import { AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredObjectValidator(control: AbstractControl): ValidationErrors | null {
  return control.value ? null : { requiredObject: true };
}