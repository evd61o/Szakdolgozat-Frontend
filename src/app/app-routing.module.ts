import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KalkulatorComponent} from "./pages/kalkulator/kalkulator.component";
import {ImportantInformationsComponent} from "./pages/important_informations/important_informations.component";
import {LoginComponent} from "./pages/login/login.component";
import {RegistrationComponent} from "./pages/registration/registration.component";
import {ProfileComponent} from "./pages/profile/profile.component";
import {AuthGuardGuard} from "./auth-guard.guard";
import {LogoutComponent} from "./pages/logout/logout.component";
import {AuthGuardGuard2} from "./authguard.guard2";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kalkulator', component: KalkulatorComponent },
  { path: 'informaciok', component:ImportantInformationsComponent },
  { path: 'bejelentkezes', component:LoginComponent, canActivate: [AuthGuardGuard] },
  { path: 'regisztracio', component:RegistrationComponent, canActivate: [AuthGuardGuard] },
  { path: 'profil', component:ProfileComponent, canActivate: [AuthGuardGuard2]  },
  { path: 'kijelentkezes', component:LogoutComponent, canActivate: [AuthGuardGuard2]  },
  { path: '**', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuardGuard, AuthGuardGuard2]
})
export class AppRoutingModule { }
