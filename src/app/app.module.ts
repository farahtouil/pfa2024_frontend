import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UsersService } from './users.service';
import { NzTableModule } from 'ng-zorro-antd/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './welcome/navbar/navbar.component';
import { HomeComponent } from './welcome/home/home.component';
import { ServicesComponent } from './services/services.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmploiComponent } from './emploi/emploi.component';
import { FooterComponent } from './welcome/footer/footer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupClientComponent } from './signup/signup-client/signup-client.component';
import { SignupPrestataireComponent } from './signup/signup-prestataire/signup-prestataire.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ServicesComponent,
    LoginComponent,
    SignupComponent,
    EmploiComponent,
    FooterComponent,
    WelcomeComponent,
    SignupClientComponent,
    SignupPrestataireComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule,
    NzTableModule
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch()) // Enable fetch API
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
