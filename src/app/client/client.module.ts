import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzTableModule } from 'ng-zorro-antd/table';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { NavbarClientComponent } from './navbar-client/navbar-client.component';
import { BabysittingComponent } from './babysitting/babysitting.component';
import { MenageComponent } from './menage/menage.component';
import { AideComponent } from './aide/aide.component';
import { ReservationComponent } from './reservation/reservation.component';



@NgModule({
  declarations: [
    ClientComponent,
    NavbarClientComponent,
    BabysittingComponent,
    MenageComponent,
    AideComponent,
    ReservationComponent,
   
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    NzTableModule
  ]
})
export class ClientModule { }
