import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MyErrorStateMatcher } from '../../shared/directives';
// import { existingUsernameValidator } from '../../shared/directives/existingUsernameValidator';

import { User } from '../../shared/models';
import { UserService } from '../../shared/services';
import { UIHelper } from '../../shared/helpers';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @ViewChild('_username') _username;
  @ViewChild('_name') _name;

  @ViewChild('_form1') form1;
  @ViewChild('_form2') form2;

  user: User;

  isLoading: boolean = false;
  selectedIndex: number = 0;
  hidePassword: boolean = true;

  // A one-liner error message retrieved from the server
  error: String = ''; 

  entryForm: FormGroup;
  matcher = new MyErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private uiHelper: UIHelper
  ) { 
    this.user = new User();

    this.createForm();
  }

  ngOnInit() {
  }

  get username() { return this.entryForm.get('username'); }
  get password() { return this.entryForm.get('password'); }
  get name() { return this.entryForm.get('name'); }

  get nameValidators() { return [Validators.required, Validators.minLength(10), Validators.maxLength(50)] }

  createForm() {
    this.entryForm = this.formBuilder.group({
      entry: 'login',
      name: [null, 
        this.nameValidators,
      ],
      username: ['', 
        [Validators.required, Validators.minLength(6), Validators.maxLength(50)],
        // [existingUsernameValidator(this.userService)]
      ],
      password: ['', 
        [Validators.required, Validators.minLength(6)] 
      ],
    });
  }
  
  submit() {
    if(this.entryForm.status === 'VALID') {
      this.user = this.entryForm.value;
      this.isLoading = true;
      this.error = '';
      this.selectedIndex === 0 ? this.user['entry'] = 'login' : this.user['entry'] = 'register';

      this.userService.login(this.user).subscribe(result => {
        this.isLoading = false;
        if(result.status === 200) {
          this.uiHelper.showSnackBar(result.message);
        } else {
          this.uiHelper.showSnackBar(result.message);
        }
      }, err => {
        this.isLoading = false;
        let error = JSON.parse(err._body);
        console.log(error);
        if(error.errors) {
          // A field message
          error.errors.forEach(err => {
            this.entryForm.get(err.field).setErrors({'customError': err.message});
          });
        } else {
          // A one line message
          // this.uiHelper.showSnackBar(error.message);
          this.error = error.message;
        }

      });
    }
  }

  selectedTabChange() {
    // Resets the form including errors
    this.error = '';
    if (this.selectedIndex !== 0) {
      return this.form1.resetForm();
    }
    this.form2.resetForm();
  }

  tabAnimationDone() {
    if (this.selectedIndex === 0) {
      // Remove the validators for name because we dont need the name when logging in
      this.entryForm.get('name').setValidators([]);
      this._username.nativeElement.focus();
    } else {
      // Add a validator for the name
      this.entryForm.get('name').setValidators(this.nameValidators);
      this._name.nativeElement.focus();
    }
    this.entryForm.get('name').updateValueAndValidity();
  }

}
