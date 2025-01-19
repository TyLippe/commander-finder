import { Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { CardsListComponent } from './cards/cards-list/cards-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: CardsListComponent, canActivate: [AuthGuard] },
];
