import { Component , OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../users.service';
import {jwtDecode} from 'jwt-decode';
import { Prestataire, PrestataireInitial, PrestataireResponse } from '../../models/serviceP.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

    prestataire: PrestataireInitial | null = null;
    error: string | null = null;
  
    constructor(private userService: UsersService, private route: ActivatedRoute) {}
  
    async ngOnInit(): Promise<void> {
      const token = this.userService.getToken();
      console.log("Token retrieved:", token);
  
      try {
        if (token) {
          const decodedToken: any = jwtDecode(token); // Decode the token
          console.log("Decoded token:", decodedToken);
          const user_id = decodedToken ? decodedToken.user_id : null;
  
          if (user_id) {
            const response : PrestataireResponse = await this.userService.getPrestataireById(user_id, token);
            console.log("prestataire",response.prestataire);
            this.prestataire = response.prestataire;
          } else {
            console.log("User ID is null");
            this.error = "User ID is missing from the token";
          }
        } else {
          console.log("Token not found");
          this.error = "Authentication token is missing";
        }
      } catch (error) {
        console.error("Error occurred:", error);
        this.error = 'Failed to load prestataire data';
      }
    }

}
