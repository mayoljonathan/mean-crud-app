import { Component, OnInit } from '@angular/core';
import { UIHelper } from 'src/app/shared/helpers/ui.helper';

// Models
// import { Dog } from '../../shared/models';

// Services
// import { DogService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // dogs: Dog[];

  constructor(
    private UIHelper: UIHelper,
  ) { }

  ngOnInit() {
  }


}
