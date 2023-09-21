import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KalkulatorComponent} from "./pages/kalkulator/kalkulator.component";
import {ImportantInformationsComponent} from "./pages/important_informations/important_informations.component";
import {ResultsComponent} from "./pages/results/results.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kalkulator', component: KalkulatorComponent },
  { path: 'informaciok', component:ImportantInformationsComponent },
  { path: 'eredmenyek', component:ResultsComponent },
  { path: 'bejelentkezes', component:LoginComponent },
  { path: 'regisztracio', component:RegistrationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
