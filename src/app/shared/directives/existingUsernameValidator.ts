import { Directive } from '@angular/core';
import { AsyncValidatorFn, AsyncValidator, NG_ASYNC_VALIDATORS, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/timer';
import { UserService } from '../services';

export function existingUsernameValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    let debounceTime = 500; //milliseconds
    return Observable.timer(debounceTime).switchMap(()=> {
      return userService.getUserByUsername(control.value).map(
        users => {
          return (users && users.length > 0) ? {"usernameExists": true} : null;
        }
      );
    });
  };
} 

@Directive({
  selector: '[usernameExists][formControlName],[usernameExists][formControl],[usernameExists][ngModel]',
  providers: [{provide: NG_ASYNC_VALIDATORS, useExisting: ExistingUsernameValidatorDirective, multi: true}]
})
export class ExistingUsernameValidatorDirective implements AsyncValidator {
  constructor(private userService: UserService) {  }

  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return existingUsernameValidator(this.userService)(control);  
  }
} 