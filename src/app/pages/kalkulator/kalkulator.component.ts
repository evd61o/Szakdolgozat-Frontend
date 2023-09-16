import {Component, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Dehumidifier, Dishwasher, Freezer, Hot_plate, Microwave, Oven, Refrigerator} from "../interface/interfaces";
import {FormBuilder} from "@angular/forms";
import {first, map, Observable, startWith, switchMap} from "rxjs";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit  {
  public refrigerators!: Refrigerator[];
  public freezers!: Freezer[];
  public hot_plates!: Hot_plate[];
  public microwaves!: Microwave[];
  public dishwashers!: Dishwasher[];
  public dehumidifiers! : Dehumidifier[];
  public ovens! : Oven[];

  public filteredOptionsRefrigerators!: Observable<Refrigerator[]>;
  public filteredOptionsFreezers!: Observable<Freezer[]>;
  public filteredOptionsHot_plates!: Observable<Hot_plate[]>;
  public filteredOptionsMicrowaves!: Observable<Microwave[]>;
  public filteredOptionsDishwashers!: Observable<Dishwasher[]>;
  public filteredOptionsDehumidifiers!: Observable<Dehumidifier[]>;
  public filteredOptionsOvens!: Observable<Oven[]>;

  public power_consumption_daily!: number;
  public power_consumption_monthly!: number;
  public power_consumption_yearly!: number;



  public form = this.fb.group({
    searchValueRefrigerator: '',
    searchValueFreezer: '',
    searchValueHot_plate: '',
    searchValueMicrowave: '',
    searchValueDishwasher: '',
    searchValueDehumidifier: '',
    searchValueOven: '',
    searchBarHot_plateHoursInput: 0,
    searchBarMicrowaveHoursInput: 0,
    searchBarDishwasherEcoProgramCountInput: 0,
    searchBarDehumidifierHoursInput: 0,
    searchBarOvenHoursInput: 0,
  });
  constructor(public readonly apiService: ApiService, private fb: FormBuilder) {}

  public ngOnInit(): void {
    this.apiService.getRefrigeratorsFromApi$()
      .pipe(first())
      .subscribe((refrigerators) => {
        this.refrigerators = refrigerators;
        this.filteredOptionsRefrigerators = this.form.get('searchValueRefrigerator')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterRefrigerator(value || '')),
        );
      });
    this.apiService.getFreezersFromApi$()
      .pipe(first())
      .subscribe((freezers) => {
        this.freezers = freezers;
        this.filteredOptionsFreezers = this.form.get('searchValueFreezer')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterFreezer(value || '')),
        );
      });
    this.apiService.getHot_PlatesFromApi$()
      .pipe(first())
      .subscribe((hot_plates) => {
        this.hot_plates = hot_plates;
        this.filteredOptionsHot_plates = this.form.get('searchValueHot_plate')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterHot_plate(value || '')),
        );
      });
    this.apiService.getMicrowavesFromApi$()
      .pipe(first())
      .subscribe((microwaves) => {
        this.microwaves = microwaves;
        this.filteredOptionsMicrowaves = this.form.get('searchValueMicrowave')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterMicrowave(value || '')),
        );
      });
    this.apiService.getDishwashersFromApi$()
      .pipe(first())
      .subscribe((dishwashers) => {
        this.dishwashers = dishwashers;
        this.filteredOptionsDishwashers = this.form.get('searchValueDishwasher')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDishwasher(value || '')),
        );
      });
    this.apiService.getDehumidifiersFromApi$()
      .pipe(first())
      .subscribe((dehumidifiers) => {
        this.dehumidifiers = dehumidifiers;
        this.filteredOptionsDehumidifiers = this.form.get('searchValueDehumidifier')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterDehumidifier(value || '')),
        );
      });
    this.apiService.getOvensFromApi$()
      .pipe(first())
      .subscribe((ovens) => {
        this.ovens = ovens;
        this.filteredOptionsOvens = this.form.get('searchValueOven')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filterOven(value || '')),
        );
      });

  };

  private _filterRefrigerator(value: string): Refrigerator[] {
    if (!this.refrigerators) return [];
    const filterValue = value.toLowerCase();

    return this.refrigerators.filter(option => option.Modell!.toLowerCase().includes(filterValue));
  }
  private _filterFreezer(value: string): Freezer[] {
    if (!this.freezers) return [];
    const filterValue = value.toLowerCase();

    return this.freezers.filter(option => option.Modell!.toLowerCase().includes(filterValue));
  }
  private _filterHot_plate(value: string): Hot_plate[] {
    if (!this.hot_plates) return [];
    const filterValue = value.toLowerCase();

    return this.hot_plates.filter(option => option.Modell!.toLowerCase().includes(filterValue));
  }
  private _filterMicrowave(value: string): Microwave[] {
    if (!this.microwaves) return [];
    const filterValue = value.toLowerCase();

    return this.microwaves.filter(option => option.Modell!.toLowerCase().includes(filterValue));
  }
  private _filterDishwasher(value: string): Dishwasher[] {
    if (!this.dishwashers) return [];
    const filterValue = value.toLowerCase();

    return this.dishwashers.filter(option => option.Modell!.toLowerCase().includes(filterValue));
  }
  private _filterDehumidifier(value: string): Dehumidifier[] {
    if (!this.dehumidifiers) return [];
    const filterValue = value.toLowerCase();

    return this.dehumidifiers.filter(option => option.Tipus!.toLowerCase().includes(filterValue));
  }
  private _filterOven(value: string): Oven[] {
    if (!this.ovens) return [];
    const filterValue = value.toLowerCase();

    return this.ovens.filter(option => option.Tipus!.toLowerCase().includes(filterValue));
  }

  public onSubmit() {

    let selected_refrigerator_values = this.refrigerators.find(refrigerator => refrigerator.Modell == this.form.value.searchValueRefrigerator);
    let selected_freezer_values = this.freezers.find(freezer => freezer.Modell == this.form.value.searchValueFreezer);
    let selected_hot_plate_values = this.hot_plates.find(hot_plate => hot_plate.Modell == this.form.value.searchValueHot_plate);
    let selected_microwave_values = this.microwaves.find(microwave => microwave.Modell == this.form.value.searchValueMicrowave);
    let selected_dishwasher_values = this.dishwashers.find(dishwasher => dishwasher.Modell == this.form.value.searchValueDishwasher);
    let selected_dehumidifier_values = this.dehumidifiers.find(dehumidifier => dehumidifier.Tipus == this.form.value.searchValueDehumidifier);
    let selected_oven_values = this.ovens.find(oven => oven.Tipus == this.form.value.searchValueOven);

    // console.log(selected_refrigerator_values?.Fogyasztasnap);
    // console.log(selected_freezer_values?.Fogyasztasnap);
    // console.log(selected_hot_plate_values?.Fogyasztas);
    // console.log(selected_microwave_values?.Fogyasztas);
    // console.log(selected_dishwasher_values?.Fogyasztas_kWh_eco_program);
    // console.log(selected_dehumidifier_values?.Fogyasztas);
    // console.log(selected_oven_values?.Fogyasztas);

    let selected_refrigerator_daily_consumption = selected_refrigerator_values?.Fogyasztasnap;
    let selected_freezer_daily_consumption = selected_freezer_values?.Fogyasztasnap;
    let selected_refrigerator_yearly_consumption = selected_refrigerator_values?.Fogyasztasev;
    let selected_freezer_yearly_consumption = selected_freezer_values?.Fogyasztasev;
    let selected_hot_plate_hourly_consumption = selected_hot_plate_values?.Fogyasztas;
    let selected_microwave_hourly_consumption = selected_microwave_values?.Fogyasztas;
    let selected_dishwasher_eco_program_consumption = selected_dishwasher_values?.Fogyasztas_kWh_eco_program;
    let selected_dehumidifier_hourly_consumption = selected_dehumidifier_values?.Fogyasztas;
    let selected_oven_hourly_consumption = selected_oven_values?.Fogyasztas;

    let searchBarHot_plateHoursInput = this.form.value.searchBarHot_plateHoursInput;
    let searchBarMicrowaveHoursInput = this.form.value.searchBarMicrowaveHoursInput;
    let searchBarDishwasherEcoProgramCountInput = this.form.value.searchBarDishwasherEcoProgramCountInput;
    let searchBarDehumidifierHoursInput = this.form.value.searchBarDehumidifierHoursInput;
    let searchBarOvenHoursInput = this.form.value.searchBarOvenHoursInput;

    // console.log(this.form.value.searchBarHot_plateHoursInput);
    // console.log(this.form.value.searchBarMicrowaveHoursInput);
    // console.log(this.form.value.searchBarDishwasherEcoProgramCountInput);
    // console.log(this.form.value.searchBarDehumidifierHoursInput);
    // console.log(this.form.value.searchBarOvenHoursInput);

    let daily_power_consumption = selected_refrigerator_daily_consumption! + selected_freezer_daily_consumption! +
      (searchBarHot_plateHoursInput! * selected_hot_plate_hourly_consumption!) + (searchBarMicrowaveHoursInput! * selected_microwave_hourly_consumption!) +
      (searchBarDishwasherEcoProgramCountInput! * selected_dishwasher_eco_program_consumption!) +
      (searchBarDehumidifierHoursInput! * selected_dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * selected_oven_hourly_consumption!);

    let monthly_power_consumption = daily_power_consumption * 30;

    let yearly_power_consumption = ((searchBarHot_plateHoursInput! * selected_hot_plate_hourly_consumption!) +
        (searchBarMicrowaveHoursInput! * selected_microwave_hourly_consumption!) +
      (searchBarDishwasherEcoProgramCountInput! * selected_dishwasher_eco_program_consumption!) +
      (searchBarDehumidifierHoursInput! * selected_dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * selected_oven_hourly_consumption!)) * 365 +
      (selected_refrigerator_yearly_consumption! + selected_freezer_yearly_consumption!);

    this.power_consumption_daily = daily_power_consumption;
    this.power_consumption_monthly = monthly_power_consumption;
    this.power_consumption_yearly = yearly_power_consumption;

    // console.log(selected_refrigerator_daily_consumption! + selected_freezer_daily_consumption! +
    //   (searchBarHot_plateHoursInput! * selected_hot_plate_hourly_consumption!) + (searchBarMicrowaveHoursInput! * selected_microwave_hourly_consumption!) +
    //   (searchBarDishwasherEcoProgramCountInput! * selected_dishwasher_eco_program_consumption!) +
    //   (searchBarDehumidifierHoursInput! * selected_dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * selected_oven_hourly_consumption!));
  }

}
