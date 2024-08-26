import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-signup-client',
  templateUrl: './signup-client.component.html',
  styleUrls: ['./signup-client.component.css']
})
export class SignupClientComponent {

  nom: string = '';
  prenom: string = '';
  gouvernorat: string = '';
  mail: string = '';
  mdp: string = '';
  num_tel: string = '';
  errorMessage: string | null = null;

  constructor(private usersService: UsersService, private router: Router) {}

  async handleClientSignup() {

    if (!this.nom || !this.prenom || !this.gouvernorat || !this.mail || !this.mdp || !this.num_tel) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // Validate phone number (8 digits)
    const phonePattern = /^\d{8}$/;
    if (!phonePattern.test(this.num_tel)) {
      this.errorMessage = 'Le numéro de téléphone doit comporter exactement 8 chiffres.';
      return;
    }

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.mail)) {
      this.errorMessage = 'Veuillez entrer une adresse email valide.';
      return;
    }

    const clientData = {
      nom: this.nom,
      prenom: this.prenom,
      gouvernorat: this.gouvernorat,
      mail: this.mail,
      mdp: this.mdp,
      num_tel: this.num_tel
    };

    try {
      const response = await this.usersService.registerClient(clientData);
      console.log("Request Data:", {
        nom: this.nom,
        prenom: this.prenom,
        num_tel: this.num_tel,
        gouvernorat: this.gouvernorat,
        mail: this.mail,
        mdp: this.mdp,

      });
      if (response && response.statusCode === 200) {
        this.router.navigate(['/login']);
        console.log('Registration successful:', response);
      } else {
        alert('Impossible de créer un compte avec cet email. L\'adresse est déjà utilisée.');
      }
      
    } catch (error: any) {
      console.error('Registration failed:', error);
      alert('Une erreur est survenue lors de l\'inscription. Veuillez réessayer.');
    }
  };
    
  
  
  
}
