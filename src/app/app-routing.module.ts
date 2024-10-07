import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupClientComponent } from './signup/signup-client/signup-client.component';
import { SignupPrestataireComponent } from './signup/signup-prestataire/signup-prestataire.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'signup/signup-client',component:SignupClientComponent},
  {path:'signup/signup-prestataire',component:SignupPrestataireComponent},
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule) },
  { path: 'prestataire', loadChildren: () => import('./prestataire/prestataire.module').then(m => m.PrestataireModule) },
  { path: '**',component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
