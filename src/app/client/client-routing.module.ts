import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { BabysittingComponent } from './babysitting/babysitting.component';
import { MenageComponent } from './menage/menage.component';
import { AideComponent } from './aide/aide.component';
import { ReservationComponent } from './reservation/reservation.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'babysitting', component: BabysittingComponent },
  { path: 'menage', component: MenageComponent },
  { path: 'aide', component: AideComponent },
  { path: 'reservation', component: ReservationComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
