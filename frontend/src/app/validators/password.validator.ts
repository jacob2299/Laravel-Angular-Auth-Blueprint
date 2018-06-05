import { AbstractControl } from '@angular/forms';

export class PasswordValidator {

  static MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value;
    const confirmPassword = AC.get('passwordConfirmation').value;

    if (password !== confirmPassword) {
      AC.get('passwordConfirmation').setErrors({ MatchPassword: true });
    } else {
      return null;
    }
  }
}
