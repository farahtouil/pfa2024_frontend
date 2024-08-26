import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-signup-prestataire',
  templateUrl: './signup-prestataire.component.html',
  styleUrl: './signup-prestataire.component.css'
})
export class SignupPrestataireComponent {

  nom: string = '';
  prenom: string = '';
  gouvernorat: string = '';
  mail: string = '';
  mdp: string = '';
  num_tel: string = '';
  profileImage: File | null = null; 
  date_de_naissance: string = '';
  servicesP = [
    { id: 1, name: 'menage' },
    { id: 2, name: 'babysitting' },
    { id: 3, name: 'aide' }
  ];
  selectedServices: number[] = [];
  showPriceField: { [key: number]: boolean } = {};
  prices: { [key: number]: number } = {};
  errorMessage: string | null = null;
  constructor(private usersService: UsersService, private router: Router) {}

  onServiceChange(event: any, serviceId: number) {
    if (event.target.checked) {
      this.selectedServices.push(serviceId);
      this.showPriceField[serviceId] = true;
    } else {
      this.selectedServices = this.selectedServices.filter(id => id !== serviceId);
      this.showPriceField[serviceId] = false;
      delete this.prices[serviceId];
    }
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.profileImage = file;
    }
  }

  async handlePrestataireSignup() {
    if (this.selectedServices.length === 0) {
      this.errorMessage = 'Vous devez sélectionner au moins un service.';
      return;
    }

    if (!this.nom || !this.prenom || !this.gouvernorat || !this.mail || !this.mdp || !this.num_tel || !this.profileImage || !this.date_de_naissance) {
      this.errorMessage = 'Veuillez remplir tous les champs.';
      return;
    }

    // Check if at least one service is selected
  if (this.selectedServices.length === 0) {
    this.errorMessage = 'Vous devez sélectionner au moins un service.';
    return;
  }

  // Check if each selected service has a price set
  for (const serviceId of this.selectedServices) {
    if (!this.prices[serviceId]) {
      this.errorMessage = `Veuillez définir le prix pour le service de ${serviceId}.`;
      return;
    }
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

    const reader = new FileReader();
  reader.onload = async () => {
    const base64String = reader.result as string;
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    const signupData = {
      nom: this.nom,
      prenom: this.prenom,
      num_tel: this.num_tel,
      gouvernorat: this.gouvernorat,
      mail: this.mail,
      mdp: this.mdp,
      image: base64Data,
      date_de_naissance: this.date_de_naissance,
      servicesP: this.selectedServices.map(serviceId => ({
        type: this.servicesP.find(service => service.id === serviceId)?.name || '',
        prixparH: this.prices[serviceId]
      }))
    };

    try {
      const response = await this.usersService.registerPrestataire(signupData);
      console.log("Request Data:", {
        nom: this.nom,
        prenom: this.prenom,
        num_tel: this.num_tel,
        gouvernorat: this.gouvernorat,
        mail: this.mail,
        mdp: this.mdp,
        date_de_naissance: this.date_de_naissance,
        servicesP: this.servicesP,
        profileImage: this.profileImage
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
  reader.readAsDataURL(this.profileImage);
}}
