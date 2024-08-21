import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-navbar-client',
  templateUrl: './navbar-client.component.html',
  styleUrl: './navbar-client.component.css'
})
export class NavbarClientComponent implements OnInit {

  constructor(private readonly userService: UsersService){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isClient:boolean = false;
  isPrestataire:boolean = false;


  ngOnInit(): void {
      this.isAuthenticated = this.userService.isAuthenticated();
      this.isAdmin = this.userService.isAdmin();
      this.isClient = this.userService.isClient();
      this.isPrestataire = this.userService.isPrestataire();
  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isClient = false;
    this.isPrestataire = false;
  }

}
