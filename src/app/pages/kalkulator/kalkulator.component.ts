import {Component, OnDestroy, OnInit} from '@angular/core';
import {ApiService} from "../../shared/api/api.service";
import {
  Dehumidifier,
  Dishwasher, Dryer,
  Freezer,
  Hot_plate,
  Microwave,
  Oven, Profiles,
  Refrigerator,
  Washing_machine
} from "../interface/interfaces";
import {FormBuilder, Validators} from "@angular/forms";
import {first, map, Observable, startWith, Subject, switchMap, takeUntil} from "rxjs";
import {LoginService} from "../../shared/api/login.service";


@Component({
  selector: 'app-kalkulator',
  templateUrl: './kalkulator.component.html',
  styleUrls: ['./kalkulator.component.scss'],

})
export class KalkulatorComponent implements OnInit, OnDestroy {

  public apiRequestInProgress: boolean = false;
  showBeforeKalkulate:boolean = true;
  showAfterKalkulate:boolean = false;
  loading:boolean = false;
  private  submitType:string = '';
  public errorMessage = '';

  private onDestroy$ = new Subject<void>();

  public refrigerators!: Refrigerator[];
  public minrefrigerator!: Refrigerator[];
  public refrigerators_w_lower_consumption!: Refrigerator[];
  public freezers!: Freezer[];
  public minfreezer!: Freezer[];
  public freezers_w_lower_consumption!: Freezer[];
  public hot_plates!: Hot_plate[];
  public minhot_plate!: Hot_plate[];
  public hot_plates_w_lower_consumption!: Hot_plate[];
  public microwaves!: Microwave[];
  public minmicrowave!: Microwave[];
  public dishwashers!: Dishwasher[];
  public mindishwasher!: Dishwasher[];
  public dishwashers_w_lower_consumption!: Dishwasher[];
  public dehumidifiers! : Dehumidifier[];
  public mindehumidifier!: Dehumidifier[];
  public ovens! : Oven[];
  public minoventraditional!: Oven[];
  public minovenairmixing!: Oven[];
  public ovens_w_lower_consumption! : Oven[];
  public washing_machines! :Washing_machine[];
  public minwashing_machine!: Washing_machine[];
  public washing_machines_w_lower_consumption! :Washing_machine[];
  public dryers! :Dryer[];
  public mindryer!: Dryer[];
  public dryers_w_lower_consumption! :Dryer[];
  public profiles!: Profiles[];

  public filteredOptionsRefrigerators!: Observable<Refrigerator[]>;
  public filteredOptionsFreezers!: Observable<Freezer[]>;
  public filteredOptionsHot_plates!: Observable<Hot_plate[]>;
  public filteredOptionsMicrowaves!: Observable<Microwave[]>;
  public filteredOptionsDishwashers!: Observable<Dishwasher[]>;
  public filteredOptionsDehumidifiers!: Observable<Dehumidifier[]>;
  public filteredOptionsOvens!: Observable<Oven[]>;
  public filteredOptionsWashing_machines!: Observable<Washing_machine[]>;
  public filteredOptionsDryers!: Observable<Dryer[]>;

  public power_consumption_daily!: number;
  public power_consumption_monthly!: number;
  public power_consumption_yearly!: number;

  public power_consumption_daily_price!: number;
  public power_consumption_monthly_price!: number;
  public power_consumption_yearly_price!: number;


  public selected_refrigerator_y_c!: number | undefined;
  public selected_freezer_y_c!: number | undefined;
  public selected_dishwasher_ep_c!: number | undefined;
  public selected_hot_plate_c!: number | undefined;
  public selected_oven_c_traditional!: number | undefined;
  public selected_oven_c_airmixing!: number | undefined;
  public selected_washing_m_ep40_60_c!: number | undefined;
  public selected_dryer_y_c!: number | undefined;


  public form = this.fb.group({
    searchValueRefrigerator: ['', Validators.required],
    searchValueFreezer: ['', Validators.required],
    searchValueHot_plate: ['', Validators.required],
    searchValueMicrowave: ['', Validators.required],
    searchValueDishwasher: ['', Validators.required],
    searchValueDehumidifier: ['', Validators.required],
    searchValueOven: ['', Validators.required],
    searchValueWashing_machine: ['', Validators.required],
    searchValueDryer: ['', Validators.required],
    searchBarHot_plateMinutesInput: 0,
    searchBarMicrowaveMinutesInput: 0,
    searchBarDishwasherEcoProgramCountInput: 0,
    searchBarDehumidifierMinutesInput: 0,
    searchBarOvenCicleCountInput: 0,
    searchBarWashingMachineEcoProgram40_60CountInput: 0,
    submitType: ''
  });
  constructor(public readonly apiService: ApiService, private fb: FormBuilder, private readonly loginService: LoginService) {}

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

    this.form.get('searchValueRefrigerator')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const refrigeratorsData = this.refrigerators.find(value => value.Modell === modell);
      if (refrigeratorsData){
        this.apiService.getSearchedRefrigeratorsFromApi$(refrigeratorsData.Fogyasztasev!)
          .pipe(first())
          .subscribe((refrigerators_w_lower_consumption) => {
            this.refrigerators_w_lower_consumption = refrigerators_w_lower_consumption;
          });
      }
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
          .subscribe((freezers_w_lower_consumption) => {
            this.freezers_w_lower_consumption = freezers_w_lower_consumption;
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

    this.form.get('searchValueHot_plate')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const freezersData = this.hot_plates.find(value => value.Modell === modell);
      if (freezersData){
        this.apiService.getSearchedHot_PlatesFromApi$(freezersData.Fogyasztas!)
          .pipe(first())
          .subscribe((hot_plates_w_lower_consumption) => {
            this.hot_plates_w_lower_consumption = hot_plates_w_lower_consumption;
          });
      }
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

    this.form.get('searchValueDishwasher')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const dishwashersData = this.dishwashers.find(value => value.Modell === modell);
      if (dishwashersData){
        this.apiService.getSearchedDishwashersFromApi$(dishwashersData.Fogyasztas_kWh_eco_program!)
          .pipe(first())
          .subscribe((dishwashers_w_lower_consumption) => {
            this.dishwashers_w_lower_consumption = dishwashers_w_lower_consumption;
          });
      }
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

    this.form.get('searchValueOven')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const freezersData = this.ovens.find(value => value.Modell === modell);
      if (freezersData){
        this.apiService.getSearchedOvensFromApi$(freezersData.Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos!, freezersData.Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses!)
          .pipe(first())
          .subscribe((ovens_w_lower_consumption) => {
            this.ovens_w_lower_consumption = ovens_w_lower_consumption;
          });
      }
    });

    this.apiService.getWashing_machinesFromApi$()
      .pipe(first())
      .subscribe((washing_machines) => {
        this.washing_machines = washing_machines;
        this.filteredOptionsWashing_machines = this.form.get('searchValueWashing_machine')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',washing_machines)),
        );
      });

    this.form.get('searchValueWashing_machine')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const freezersData = this.washing_machines.find(value => value.Modell === modell);
      if (freezersData){
        this.apiService.getSearchedWashing_machinesFromApi$(freezersData.Fogyasztas_eco_40_60_program!)
          .pipe(first())
          .subscribe((washing_machines_w_lower_consumption) => {
            this.washing_machines_w_lower_consumption = washing_machines_w_lower_consumption;
          });
      }
    });

    this.apiService.getDryersFromApi$()
      .pipe(first())
      .subscribe((dryers) => {
        this.dryers = dryers;
        this.filteredOptionsDryers = this.form.get('searchValueDryer')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '',dryers)),
        );
      });

    this.form.get('searchValueDryer')!.valueChanges.pipe(takeUntil(this.onDestroy$)).subscribe(modell => {
      const freezersData = this.dryers.find(value => value.Modell === modell);
      if (freezersData){
        this.apiService.getSearchedDryersFromApi$(freezersData.Fogyasztasev!)
          .pipe(first())
          .subscribe((dryers_w_lower_consumption) => {
            this.dryers_w_lower_consumption = dryers_w_lower_consumption;
          });
      }
    });

    this.apiService.getMinRefrigeratorFromApi$().subscribe((minrefrigerator) => {
      this.minrefrigerator = minrefrigerator;
    });

    this.apiService.getMinFreezerFromApi$().subscribe((minfreezer) => {
      this.minfreezer = minfreezer;
    });

    this.apiService.getMinHot_PlateFromApi$().subscribe((minhot_plate) => {
      this.minhot_plate = minhot_plate;
    });

    this.apiService.getMinMicrowaveFromApi$().subscribe((minmicrowave) => {
      this.minmicrowave = minmicrowave;
    });

    this.apiService.getMinDishwasherFromApi$().subscribe((mindishwasher) => {
      this.mindishwasher = mindishwasher;
    });

    this.apiService.getMinDehumidifierFromApi$().subscribe((mindehumidifier) => {
      this.mindehumidifier = mindehumidifier;
    });

    this.apiService.getMinOvenTraditionalFromApi$().subscribe((minoventraditional) => {
      this.minoventraditional = minoventraditional;
    });

    this.apiService.getMinOvenAirMixingFromApi$().subscribe((minovenairmixing) => {
      this.minovenairmixing = minovenairmixing;
    });

    this.apiService.getMinWashing_MachineFromApi$().subscribe((minwashing_machine) => {
      this.minwashing_machine = minwashing_machine;
    });

    this.apiService.getMinDryerFromApi$().subscribe((mindryer) => {
      this.mindryer = mindryer;
    });

    this.apiService.getProfilesFromApi$(this.loginService.getUserEmail())
      .pipe(first())
      .subscribe((profiles) => {
        this.profiles = profiles;
      });

  };


  private _filter(value: string, object: any[]) {
    if (!object) return [];
    return object.filter(option => option?.Modell?.toLowerCase().includes(value.toLowerCase()) || option?.Marka?.toLowerCase().includes(value.toLowerCase()));
  }

  public onSzamolasSubmit() {
    // Ezt hívd meg, ha a "Számolás" gombra kattintanak
    console.log('Számolás gombra kattintva');
    // Végrehajtsd a számoláshoz szükséges műveleteket
  }

  setSubmitType(type: string) {
    this.submitType = type;
  }
  public onSubmit() {
    if (this.submitType === 'betoltes'){
      if(!this.loginService.getUserEmail()){
        this.errorMessage = 'Jelentkezz be a profilod betöltéséhez!';
      } else {
        this.form.patchValue(this.profiles[0]);
      }
    }
    if (this.submitType === 'szamolas'){

      if (this.form.valid && this.form.enabled) {
        this.apiRequestInProgress = true;
        this.form.disable();
        const form_value = this.form.value;
        this.errorMessage = '';

        let refrigerator_values = this.refrigerators.find(value => value.Modell == form_value.searchValueRefrigerator);
        let freezer_values = this.freezers.find(value => value.Modell == form_value.searchValueFreezer);
        let hot_plate_values = this.hot_plates.find(value => value.Modell == form_value.searchValueHot_plate);
        let microwave_values = this.microwaves.find(value => value.Modell == form_value.searchValueMicrowave);
        let dishwasher_values = this.dishwashers.find(value => value.Modell == form_value.searchValueDishwasher);
        let dehumidifier_values = this.dehumidifiers.find(value => value.Modell == form_value.searchValueDehumidifier);
        let oven_values = this.ovens.find(value => value.Modell == form_value.searchValueOven);
        let washing_machine_values = this.washing_machines.find(value => value.Modell == form_value.searchValueWashing_machine);
        let dryer_values = this.dryers.find(value => value.Modell == form_value.searchValueDryer);

        console.log(refrigerator_values?.Fogyasztasnap);
        console.log(freezer_values?.Fogyasztasnap);
        console.log(hot_plate_values?.Fogyasztas);
        console.log(microwave_values?.Fogyasztas);
        console.log(dishwasher_values?.Fogyasztas_kWh_eco_program);
        console.log(dehumidifier_values?.Fogyasztas);
        console.log(oven_values?.Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos);
        console.log(washing_machine_values?.Fogyasztas_eco_40_60_program);
        console.log(dryer_values?.Fogyasztasnap);

        let refrigerator_daily_consumption = refrigerator_values?.Fogyasztasnap;
        let freezer_daily_consumption = freezer_values?.Fogyasztasnap;
        let refrigerator_yearly_consumption = refrigerator_values?.Fogyasztasev;
        let freezer_yearly_consumption = freezer_values?.Fogyasztasev;
        let hot_plate_consumption = hot_plate_values?.Fogyasztas;
        let microwave_consumption = microwave_values?.Fogyasztas;
        let dishwasher_eco_program_consumption = dishwasher_values?.Fogyasztas_kWh_eco_program;
        let dehumidifier_consumption = dehumidifier_values?.Fogyasztas;
        let oven_consumption_traditional = oven_values?.Egy_uzemciklusra_vetitett_energiafogyasztas_hagyomanyos;
        let oven_consumption_airmixing = oven_values?.Egy_uzemciklusra_vetitett_energiafogyasztas_legkevereses;
        let washing_machine_eco_40_60_program_consumption = washing_machine_values?.Fogyasztas_eco_40_60_program;
        let dryer_daily_consumption = dryer_values?.Fogyasztasnap;
        let dryer_yearly_consumption = dryer_values?.Fogyasztasev;

        let searchBarHot_plateMinutesInput = form_value.searchBarHot_plateMinutesInput!/60;
        let searchBarMicrowaveMinutesInput = form_value.searchBarMicrowaveMinutesInput!/60;
        let searchBarDishwasherEcoProgramCountInput = form_value.searchBarDishwasherEcoProgramCountInput;
        let searchBarDehumidifierMinutesInput = form_value.searchBarDehumidifierMinutesInput!/60;
        let searchBarWashingMachineEcoProgram40_60CountInput = form_value.searchBarWashingMachineEcoProgram40_60CountInput;
        let searchBarOvenCicleCountInput = form_value.searchBarOvenCicleCountInput;

        console.log(form_value.searchBarHot_plateMinutesInput);
        console.log(form_value.searchBarMicrowaveMinutesInput);
        console.log(form_value.searchBarDishwasherEcoProgramCountInput);
        console.log(form_value.searchBarDehumidifierMinutesInput);
        console.log(form_value.searchBarOvenCicleCountInput);
        console.log(form_value.searchBarWashingMachineEcoProgram40_60CountInput);

        let daily_power_consumption = refrigerator_daily_consumption! + freezer_daily_consumption! + dryer_daily_consumption! +
          (searchBarHot_plateMinutesInput! * hot_plate_consumption!) + (searchBarMicrowaveMinutesInput! * microwave_consumption!) +
          (searchBarDishwasherEcoProgramCountInput! * dishwasher_eco_program_consumption!) +
          (searchBarDehumidifierMinutesInput! * dehumidifier_consumption!) + (searchBarOvenCicleCountInput! * oven_consumption_traditional!) +
          (searchBarWashingMachineEcoProgram40_60CountInput! * washing_machine_eco_40_60_program_consumption!);

        let monthly_power_consumption = daily_power_consumption * 30;

        let yearly_power_consumption = ((searchBarHot_plateMinutesInput! * hot_plate_consumption!) +
            (searchBarMicrowaveMinutesInput! * microwave_consumption!) +
            (searchBarDishwasherEcoProgramCountInput! * dishwasher_eco_program_consumption!) +
            (searchBarDehumidifierMinutesInput! * dehumidifier_consumption!) + (searchBarOvenCicleCountInput! * oven_consumption_traditional!) +
            (searchBarWashingMachineEcoProgram40_60CountInput! * washing_machine_eco_40_60_program_consumption!)) * 365 +
          (refrigerator_yearly_consumption! + freezer_yearly_consumption! + dryer_yearly_consumption!);

        this.power_consumption_daily = Math.round(daily_power_consumption * 100) / 100;
        this.power_consumption_monthly = Math.round(monthly_power_consumption * 100) / 100;
        this.power_consumption_yearly =  Math.round(yearly_power_consumption * 100) / 100;

        this.power_consumption_daily_price = +(daily_power_consumption * 35.293).toFixed(2);
        this.power_consumption_monthly_price = +(monthly_power_consumption * 35.293).toFixed(2);
        this.power_consumption_yearly_price = yearly_power_consumption;

        if (this.power_consumption_yearly_price > 2523) {
          this.power_consumption_yearly_price = +((this.power_consumption_yearly_price - 2523) * 70.104 + (2523 * 35.293)).toFixed(2);
        } else {
          this.power_consumption_yearly_price = +(this.power_consumption_yearly_price * 35.293).toFixed(2);
        }


        console.log(daily_power_consumption)

        this.selected_refrigerator_y_c = refrigerator_yearly_consumption;
        this.selected_freezer_y_c = freezer_yearly_consumption;
        this.selected_hot_plate_c = hot_plate_consumption;
        this.selected_oven_c_traditional = oven_consumption_traditional;
        this.selected_oven_c_airmixing = oven_consumption_airmixing;
        this.selected_dishwasher_ep_c = dishwasher_eco_program_consumption;
        this.selected_washing_m_ep40_60_c = washing_machine_eco_40_60_program_consumption;
        this.selected_dryer_y_c = dryer_yearly_consumption;

        this.showBeforeKalkulate=false;
        this.showAfterKalkulate=true;
        this.loading=true;

      }

    }
    if (this.submitType === 'ujratoltes') {
      window.location.reload();
    }

    if (this.form.invalid && this.form.enabled) {
      this.form.markAllAsTouched();
      this.errorMessage = 'Válassza ki vagy töltse be a háztartási gépeit!';
    }
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
