import {Component, Input, OnInit} from '@angular/core';
import {KalkulatorComponent} from "../kalkulator/kalkulator.component";
import {ApiService} from "../../shared/api/api.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit{

  constructor(public readonly calculatorComponent: KalkulatorComponent) {

  }

  public asd = this.calculatorComponent.power_consumption_daily;

  ngOnInit(): void {


  }


}
