import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiaryComponent } from './diary/diary.component';
import { RemindersComponent } from './reminders/reminders.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'diary', component: DiaryComponent },
  { path: 'reminders', component: RemindersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
