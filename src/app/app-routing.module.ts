import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiaryComponent } from './diary/diary.component';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { AuthGuard } from './auth/auth.guard';
import { DetailsComponent } from './auth/details/details.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { MedicationComponent } from './medication/medication.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'details', component: DetailsComponent, canActivate: [AuthGuard] },
  { path: 'appointments', component: AppointmentsComponent, canActivate: [AuthGuard] },
  { path: 'diary', component: DiaryComponent, canActivate: [AuthGuard] },
  { path: 'emergency-contacts', component: EmergencyContactsComponent, canActivate: [AuthGuard] },
  { path: 'update-details', component: UpdateDetailsComponent, canActivate: [AuthGuard] },
  { path: 'medication', component: MedicationComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // normally done in app.module.ts but guards are ok to do here
})
export class AppRoutingModule { }
