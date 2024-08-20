import { Component,OnInit} from '@angular/core';
import { FormBuilder,Validators,FormGroup,FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }

  mail: string = '';
  mdp: string = '';
  errorMessage: string = '';

  async handleSubmit() {

    if (!this.mail || !this.mdp) {
      this.showError("mail et mot de passe sont necessaires!");
      return;
    }
  
    try {
      const response = await this.usersService.login(this.mail, this.mdp);
      if (response.statusCode == 200) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        if (response.role === 'admin') {
          this.router.navigate(['/admin']);
        } else if (response.role === 'client') {
          this.router.navigate(['/client']);
        }else if (response.role === 'prestataire') {
          this.router.navigate(['/prestataire']);
        }
      } else {
        this.showError(response.message);
      }
    } catch (error: any) {
      this.showError(error.message);
    }
  }

    showError(mess: string) {
      this.errorMessage = mess;
      /*setTimeout(() => {
        this.errorMessage = '';
      }, 3000);*/
    }
  
}


