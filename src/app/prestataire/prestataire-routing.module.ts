import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrestataireComponent } from './prestataire.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: PrestataireComponent },
  { path : 'reservations',component: ReservationsComponent},
  { path : 'profile',component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrestataireRoutingModule { }
