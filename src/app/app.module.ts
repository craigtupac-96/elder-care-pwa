import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { AppointmentsComponent } from './appointments/appointments.component';
import { DiaryComponent } from './diary/diary.component';
import { AuthService } from './auth/auth.service';
import { DetailsComponent } from './auth/details/details.component';
import { EmergencyContactsComponent } from './emergency-contacts/emergency-contacts.component';
import { UpdateDetailsComponent } from './update-details/update-details.component';
import { ToDoComponent } from './to-do/to-do.component';
import { MedicationComponent } from './medication/medication.component';
import { DashAppointmentsComponent } from './dash-appointments/dash-appointments.component';
import { DashDiaryEntryComponent } from './dash-diary-entry/dash-diary-entry.component';
import { DashGroupDiaryEntryComponent } from './dash-group-diary-entry/dash-group-diary-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    LoginComponent,
    AppointmentsComponent,
    DiaryComponent,
    DetailsComponent,
    EmergencyContactsComponent,
    UpdateDetailsComponent,
    ToDoComponent,
    MedicationComponent,
    DashAppointmentsComponent,
    DashDiaryEntryComponent,
    DashGroupDiaryEntryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireDatabaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
