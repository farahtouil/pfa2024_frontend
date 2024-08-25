import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  selectRole(role: string) {
    if (role === 'client') {
      this.router.navigate(['/signup/client']);
    } else if (role === 'prestataire') {
      this.router.navigate(['/signup/prestataire']);
    } else {
      this.errorMessage = 'Veuillez sélectionner un rôle valide.';
    }
  }

  handleSubmit() {
    // You can handle form submission here if needed
  }

}
