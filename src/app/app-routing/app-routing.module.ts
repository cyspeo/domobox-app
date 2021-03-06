import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard }       from './can-deactivate-guard.service';

import { CommonModule } from '@angular/common';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { PiscineComponent } from '../piscine/piscine.component';
import { ParamComponent } from '../param/param.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard',  component: DashboardComponent },
  { path: 'piscine',  component: PiscineComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'param', component: ParamComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [CanDeactivateGuard]
})

export class AppRoutingModule { }