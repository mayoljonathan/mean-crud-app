import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../shared/models';
import { UserService } from '../../shared/services';
import { UIHelper } from 'src/app/shared/helpers';

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.scss']
})
export class EntryComponent implements OnInit {

  @ViewChild('username') username;
  @ViewChild('name') name;

  private user: User;

  private isLoading: boolean = false;
  private selectedIndex: number = 0;
  private hidePassword: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private uiHelper: UIHelper
  ) { 
    this.user = new User();
  }

  ngOnInit() {
  }
  
  submit() {
    this.isLoading = true;
    this.selectedIndex === 0 ? this.user['entry'] = 'login' : this.user['entry'] = 'register';
    this.userService.login(this.user).subscribe(result => {
      this.isLoading = false;
      console.log(result);
      if(result.status === 200) {
        console.log('Success login');
        this.uiHelper.showSnackBar(result.message);
      } else {
        console.log('Error login');
        this.uiHelper.showSnackBar(result.message);
      }
    }, err => {
      this.isLoading = false;
      let error = JSON.parse(err._body);
      console.log(error);
      this.uiHelper.showSnackBar(error.message);
    });
  }

  tabAnimationDone() {
    if (this.selectedIndex === 0) {
      return this.username.nativeElement.focus();
    }
    this.name.nativeElement.focus();
  }

}
