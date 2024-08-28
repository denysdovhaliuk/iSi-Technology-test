import { Directive } from '@angular/core';
import { Validator, AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true }]
})
export class PasswordValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    const password = control.value;

    if (!password) {
      return null; 
    }

    
    const hasLetter = /[A-Za-z]/.test(password);
    
    const hasNumber = /\d/.test(password);
    
    const isValidLength = password.length >= 8;

    const passwordValid = hasLetter && hasNumber && isValidLength;

    return passwordValid ? null : { invalidPassword: true };
}
}