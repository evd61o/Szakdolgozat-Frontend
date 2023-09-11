import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Dehumidifier, Dishwasher, Freezer, Hot_plate, Microwave, Oven, Refrigerator} from "../interface/interfaces";
import {FormBuilder} from "@angular/forms";
import {first} from "rxjs";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit  {
  public refrigerators: Refrigerator[] = [];
  public freezers: Freezer[] = [];
  public hot_plates: Hot_plate[] = [];
  public microwaves: Microwave[] = [];
  public dishwashers: Dishwasher[] = [];
  public dehumidifiers : Dehumidifier[] = [];
  public ovens : Oven[] = [];

  public form = this.fb.group({
    searchValueRefrigerator: '',
    searchValueFreezer: '',
    searchValueHot_plate: '',
    searchValueMicrowave: '',
    searchValueDishwasher: '',
    searchValueDehumidifier: '',
    searchValueOven: ''
  });
  constructor(private readonly apiService: ApiService, private fb: FormBuilder) {}

  public ngOnInit(): void {

    this.fetchData();
  };
  fetchData(): void {
    this.apiService.getRefrigeratorsFromApi$(this.form.value.searchValueRefrigerator!)
      .pipe(first())
      .subscribe((refrigerators) => {
        this.refrigerators = [];
        this.refrigerators.push(refrigerators);
      });
    this.apiService.getFreezersFromApi$(this.form.value.searchValueFreezer!)
      .pipe(first())
      .subscribe((freezers) => {
        this.freezers = [];
        this.freezers.push(freezers);
      });
    this.apiService.getHot_PlatesFromApi$(this.form.value.searchValueHot_plate!)
      .pipe(first())
      .subscribe((hot_plates) => {
        this.hot_plates = [];
        this.hot_plates.push(hot_plates);
      });
    this.apiService.getMicrowavesFromApi$(this.form.value.searchValueMicrowave!)
      .pipe(first())
      .subscribe((microwaves) => {
        this.microwaves = [];
        this.microwaves.push(microwaves);
      });
    this.apiService.getDishwashersFromApi$(this.form.value.searchValueDishwasher!)
      .pipe(first())
      .subscribe((dishwashers) => {
        this.dishwashers = [];
        this.dishwashers.push(dishwashers);
      });
    this.apiService.getDehumidifiersFromApi$(this.form.value.searchValueDehumidifier!)
      .pipe(first())
      .subscribe((dehumidifiers) => {
        this.dehumidifiers = [];
        this.dehumidifiers.push(dehumidifiers);
      });
    this.apiService.getOvensFromApi$(this.form.value.searchValueOven!)
      .pipe(first())
      .subscribe((ovens) => {
        this.ovens = [];
        this.ovens.push(ovens);
      });
  }

  public onSearchSubmit(): void {
    this.fetchData();
  }

}
