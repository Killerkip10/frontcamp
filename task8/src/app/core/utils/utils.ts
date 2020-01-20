import { FormControl, ValidationErrors } from '@angular/forms';
import { trim } from 'lodash';

export const requiredTrimmedTextValidator = (control: FormControl): ValidationErrors => {
  if (!trim(control.value)) {
    return { message: '' };
  }

  return null;
};

