import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireComponent } from './prestataire.component';
import { NavbarPrestataireComponent } from './navbar-prestataire/navbar-prestataire.component';
import { ProfileComponent } from './profile/profile.component';
import { ReservationsComponent } from './reservations/reservations.component';


@NgModule({
  declarations: [
    PrestataireComponent,
    NavbarPrestataireComponent,
    ProfileComponent,
    ReservationsComponent
  ],
  imports: [
    CommonModule,
    PrestataireRoutingModule
  ]
})
export class PrestataireModule { }
