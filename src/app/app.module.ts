import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import { KalkulatorComponent } from './pages/kalkulator/kalkulator.component';
import {ApiService} from "./shared/api/api.service";
import {HttpClientModule} from "@angular/common/http";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import { ImportantInformationsComponent } from './pages/important_informations/important_informations.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import {MatCardModule} from "@angular/material/card";
import { ProfileComponent } from './pages/profile/profile.component';
import { LogoutComponent } from './pages/logout/logout.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    KalkulatorComponent,
    ImportantInformationsComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCardModule,
    FormsModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCyxaikyhw05Kk_qwcKkhSPd9sbxH_-JII",
      authDomain: "szakdolgozat-a8381.firebaseapp.com",
      projectId: "szakdolgozat-a8381",
      storageBucket: "szakdolgozat-a8381.appspot.com",
      messagingSenderId: "781668655622",
      appId: "1:781668655622:web:030258d653d84db637d987"

    }),
    MatTooltipModule,
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
