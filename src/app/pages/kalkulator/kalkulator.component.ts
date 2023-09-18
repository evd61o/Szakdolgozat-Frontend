import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../api/api.service";
import {Dehumidifier, Dishwasher, Freezer, Hot_plate, Microwave, Oven, Refrigerator} from "../interface/interfaces";
import {FormBuilder} from "@angular/forms";
import {first, map, Observable, startWith, Subject, switchMap, takeUntil} from "rxjs";

@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss']
})
export class KalkulatorComponent implements OnInit, OnDestroy {
  private onDestroy$ = new Subject<void>();

  public refrigerators!: Refrigerator[];
  public freezers!: Freezer[];
  public freezers2!: Freezer[];
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

  public selected_refrigerator_y_c!: number | undefined;
  public selected_freezer_y_c!: number | undefined;
  public selected_dishwasher_ep_c!: number | undefined;



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
          map(value => this._filter(value || '', refrigerators)),
        );
      });
    this.apiService.getFreezersFromApi$()
      .pipe(first())
      .subscribe((freezers) => {
        this.freezers = freezers;
        this.filteredOptionsFreezers = this.form.get('searchValueFreezer')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', freezers)),
        );
      });

    this.form.get('searchValueFreezer')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const freezersData = this.freezers.find(value => value.Modell === modell);
      if (freezersData){
        this.apiService.getSearchedFreezersFromApi$(freezersData.Fogyasztasev!)
          .pipe(first())
          .subscribe((freezers2) => {
            this.freezers2 = freezers2;
          });
      }
    });

    this.apiService.getHot_PlatesFromApi$()
      .pipe(first())
      .subscribe((hot_plates) => {
        this.hot_plates = hot_plates;
        this.filteredOptionsHot_plates = this.form.get('searchValueHot_plate')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',hot_plates)),
        );
      });
    this.apiService.getMicrowavesFromApi$()
      .pipe(first())
      .subscribe((microwaves) => {
        this.microwaves = microwaves;
        this.filteredOptionsMicrowaves = this.form.get('searchValueMicrowave')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',microwaves)),
        );
      });
    this.apiService.getDishwashersFromApi$()
      .pipe(first())
      .subscribe((dishwashers) => {
        this.dishwashers = dishwashers;
        this.filteredOptionsDishwashers = this.form.get('searchValueDishwasher')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',dishwashers)),
        );
      });
    this.apiService.getDehumidifiersFromApi$()
      .pipe(first())
      .subscribe((dehumidifiers) => {
        this.dehumidifiers = dehumidifiers;
        this.filteredOptionsDehumidifiers = this.form.get('searchValueDehumidifier')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',dehumidifiers)),
        );
      });
    this.apiService.getOvensFromApi$()
      .pipe(first())
      .subscribe((ovens) => {
        this.ovens = ovens;
        this.filteredOptionsOvens = this.form.get('searchValueOven')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',ovens)),
        );
      });
  };

  private _filter(value: string, object: any[]) {
    if (!object) return [];
    return object.filter(option => option?.Modell?.toLowerCase().includes(value.toLowerCase()));
  }

  public onSubmit() {
    const form_value = this.form.value;

    let refrigerator_values = this.refrigerators.find(value => value.Modell == form_value.searchValueRefrigerator);
    let freezer_values = this.freezers.find(value => value.Modell == form_value.searchValueFreezer);
    let hot_plate_values = this.hot_plates.find(value => value.Modell == form_value.searchValueHot_plate);
    let microwave_values = this.microwaves.find(value => value.Modell == form_value.searchValueMicrowave);
    let dishwasher_values = this.dishwashers.find(value => value.Modell == form_value.searchValueDishwasher);
    let dehumidifier_values = this.dehumidifiers.find(value => value.Modell == form_value.searchValueDehumidifier);
    let oven_values = this.ovens.find(value => value.Modell == form_value.searchValueOven);

    // console.log(refrigerator_values?.Fogyasztasnap);
    // console.log(freezer_values?.Fogyasztasnap);
    // console.log(hot_plate_values?.Fogyasztas);
    // console.log(microwave_values?.Fogyasztas);
    // console.log(dishwasher_values?.Fogyasztas_kWh_eco_program);
    // console.log(dehumidifier_values?.Fogyasztas);
    // console.log(oven_values?.Fogyasztas);

    let refrigerator_daily_consumption = refrigerator_values?.Fogyasztasnap;
    let freezer_daily_consumption = freezer_values?.Fogyasztasnap;
    let refrigerator_yearly_consumption = refrigerator_values?.Fogyasztasev;
    let freezer_yearly_consumption = freezer_values?.Fogyasztasev;
    let hot_plate_hourly_consumption = hot_plate_values?.Fogyasztas;
    let microwave_hourly_consumption = microwave_values?.Fogyasztas;
    let dishwasher_eco_program_consumption = dishwasher_values?.Fogyasztas_kWh_eco_program;
    let dehumidifier_hourly_consumption = dehumidifier_values?.Fogyasztas;
    let oven_hourly_consumption = oven_values?.Fogyasztas;

    let searchBarHot_plateHoursInput = form_value.searchBarHot_plateHoursInput;
    let searchBarMicrowaveHoursInput = form_value.searchBarMicrowaveHoursInput;
    let searchBarDishwasherEcoProgramCountInput = form_value.searchBarDishwasherEcoProgramCountInput;
    let searchBarDehumidifierHoursInput = form_value.searchBarDehumidifierHoursInput;
    let searchBarOvenHoursInput = form_value.searchBarOvenHoursInput;

    // console.log(form_value.searchBarHot_plateHoursInput);
    // console.log(form_value.searchBarMicrowaveHoursInput);
    // console.log(form_value.searchBarDishwasherEcoProgramCountInput);
    // console.log(form_value.searchBarDehumidifierHoursInput);
    // console.log(form_value.searchBarOvenHoursInput);

    let daily_power_consumption = refrigerator_daily_consumption! + freezer_daily_consumption! +
      (searchBarHot_plateHoursInput! * hot_plate_hourly_consumption!) + (searchBarMicrowaveHoursInput! * microwave_hourly_consumption!) +
      (searchBarDishwasherEcoProgramCountInput! * dishwasher_eco_program_consumption!) +
      (searchBarDehumidifierHoursInput! * dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * oven_hourly_consumption!);

    let monthly_power_consumption = daily_power_consumption * 30;

    let yearly_power_consumption = ((searchBarHot_plateHoursInput! * hot_plate_hourly_consumption!) +
        (searchBarMicrowaveHoursInput! * microwave_hourly_consumption!) +
      (searchBarDishwasherEcoProgramCountInput! * dishwasher_eco_program_consumption!) +
      (searchBarDehumidifierHoursInput! * dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * oven_hourly_consumption!)) * 365 +
      (refrigerator_yearly_consumption! + freezer_yearly_consumption!);

    this.power_consumption_daily = daily_power_consumption;
    this.power_consumption_monthly = monthly_power_consumption;
    this.power_consumption_yearly = yearly_power_consumption;

    // console.log(refrigerator_daily_consumption! + freezer_daily_consumption! +
    //   (searchBarHot_plateHoursInput! * hot_plate_hourly_consumption!) + (searchBarMicrowaveHoursInput! * microwave_hourly_consumption!) +
    //   (searchBarDishwasherEcoProgramCountInput! * dishwasher_eco_program_consumption!) +
    //   (searchBarDehumidifierHoursInput! * dehumidifier_hourly_consumption!) + (searchBarOvenHoursInput! * oven_hourly_consumption!));


    this.selected_refrigerator_y_c = refrigerator_yearly_consumption;
    this.selected_freezer_y_c = freezer_yearly_consumption;
    this.selected_dishwasher_ep_c = dishwasher_eco_program_consumption;
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
