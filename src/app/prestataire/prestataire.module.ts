import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrestataireRoutingModule } from './prestataire-routing.module';
import { PrestataireComponent } from './prestataire.component';


@NgModule({
  declarations: [
    PrestataireComponent
  ],
  imports: [
    CommonModule,
    PrestataireRoutingModule
  ]
})
export class PrestataireModule { }
