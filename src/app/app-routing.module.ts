import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {KalkulatorComponent} from "./pages/kalkulator/kalkulator.component";
import {ImportantInformationsComponent} from "./pages/important_informations/important_informations.component";
import {ResultsComponent} from "./pages/results/results.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'kalkulator', component: KalkulatorComponent },
  { path: 'informaciok', component:ImportantInformationsComponent },
  { path: 'eredmenyek', component:ResultsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
