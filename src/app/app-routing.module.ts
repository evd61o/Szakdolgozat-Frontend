import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KalkulatorComponent} from "./pages/kalkulator/kalkulator.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kalkulator', component: KalkulatorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
