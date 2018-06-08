import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  drawerOpen: boolean = false;
  selectedDestination: string = 'home';

  // These are the side nav drawer destinations
  destinations = [
    {name: 'home'},
    {name: 'list'}
  ];

  constructor(
    private router: Router,
  ) { }

  ngOnInit() {
  }

  toggleDrawer(){
    this.drawerOpen = !this.drawerOpen;
  }

  navigateToDestination(destination) {
    console.log(`Navigating to: ${destination}`);
    this.drawerOpen = !this.drawerOpen;
    this.selectedDestination = destination;

    this.router.navigate([`/${destination}`]);
  }

}
