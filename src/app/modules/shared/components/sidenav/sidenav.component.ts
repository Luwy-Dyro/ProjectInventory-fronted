import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { KeycloakService } from 'keycloak-angular'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  username: any
  mobileQuery: MediaQueryList;

  menuNav = [
    {      name: "Home",      route: "home", ico:"home"    },
    {      name: "Categories",      route: "category", ico: "category"    },
    {      name: "Products",      route: "product", ico: "production_quantity_limits"    }
    
  ]

  constructor(media: MediaMatcher,
    private keycloakService: KeycloakService
    
    ) { 

    this.mobileQuery = media.matchMedia('(max-width: 600px)')

  }

  ngOnInit(): void {
    this.username = this.keycloakService.getUsername()
  }


  async logout() {
    this.keycloakService.clearToken();
    this.keycloakService.logout();
    }
}
