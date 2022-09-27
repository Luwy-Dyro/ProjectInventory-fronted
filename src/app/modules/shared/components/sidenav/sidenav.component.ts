import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  menuNav = [
    {      name: "Home",      route: "home", ico:"home"    },
    {      name: "Categories",      route: "category", ico: "category"    },
    {      name: "Products",      route: "product", ico: "production_quantity_limits"    }
  ]

  constructor(media: MediaMatcher ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)')

  }

  ngOnInit(): void {
  }

}
