import {Component, OnInit} from '@angular/core';
import {ApiService, Refrigerator} from "../api/api.service";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit  {
  public hutokKiirasa!: Refrigerator[];
  constructor(
    private readonly apiService: ApiService,
  ) {}

  public ngOnInit(): void {
    this.apiService.getRefrigeratorsFromApi$().subscribe((refrigerator) => {
      console.log(refrigerator);
      this.hutokKiirasa = refrigerator;
    });
  }
}
