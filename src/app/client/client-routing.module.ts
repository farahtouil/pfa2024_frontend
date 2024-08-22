import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientComponent } from './client.component';
import { BabysittingComponent } from './babysitting/babysitting.component';
import { MenageComponent } from './menage/menage.component';
import { AideComponent } from './aide/aide.component';

const routes: Routes = [
  { path: '', component: ClientComponent },
  { path: 'babysitting', component: BabysittingComponent },
  { path: 'menage', component: MenageComponent },
  { path: 'aide', component: AideComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
