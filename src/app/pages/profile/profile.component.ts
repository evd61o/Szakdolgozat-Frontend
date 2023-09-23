import {Component, Input} from '@angular/core';
import {first, map, Observable, startWith, Subject, takeUntil} from "rxjs";
import {LoginService} from "../../shared/api/login.service";
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
import {ApiService} from "../../shared/api/api.service";
import {FormBuilder, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  public apiRequestInProgress: boolean = false;
  public show:boolean = false;
  public userEmail = '';

  public refrigerators!: Refrigerator[];
  public freezers!: Freezer[];
  public hot_plates!: Hot_plate[];
  public microwaves!: Microwave[];
  public dishwashers!: Dishwasher[];
  public dehumidifiers!: Dehumidifier[];
  public ovens!: Oven[];
  public washing_machines!: Washing_machine[];
  public dryers!: Dryer[];
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
    email: ''



  });

  constructor(public readonly apiService: ApiService, private http: HttpClient, private fb: FormBuilder, private loginService: LoginService) {

    this.loginService.getUserEmail().subscribe((email) => {
      this.userEmail = email;
      const signedemail = {
        email: email,
      };

      this.form.patchValue(signedemail);

    });

  }

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

    this.apiService.getHot_PlatesFromApi$()
      .pipe(first())
      .subscribe((hot_plates) => {
        this.hot_plates = hot_plates;
        this.filteredOptionsHot_plates = this.form.get('searchValueHot_plate')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', hot_plates)),
        );
      });


    this.apiService.getMicrowavesFromApi$()
      .pipe(first())
      .subscribe((microwaves) => {
        this.microwaves = microwaves;
        this.filteredOptionsMicrowaves = this.form.get('searchValueMicrowave')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', microwaves)),
        );
      });

    this.apiService.getDishwashersFromApi$()
      .pipe(first())
      .subscribe((dishwashers) => {
        this.dishwashers = dishwashers;
        this.filteredOptionsDishwashers = this.form.get('searchValueDishwasher')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', dishwashers)),
        );
      });

    this.apiService.getDehumidifiersFromApi$()
      .pipe(first())
      .subscribe((dehumidifiers) => {
        this.dehumidifiers = dehumidifiers;
        this.filteredOptionsDehumidifiers = this.form.get('searchValueDehumidifier')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', dehumidifiers)),
        );
      });

    this.apiService.getOvensFromApi$()
      .pipe(first())
      .subscribe((ovens) => {
        this.ovens = ovens;
        this.filteredOptionsOvens = this.form.get('searchValueOven')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', ovens)),
        );
      });


    this.apiService.getWashing_machinesFromApi$()
      .pipe(first())
      .subscribe((washing_machines) => {
        this.washing_machines = washing_machines;
        this.filteredOptionsWashing_machines = this.form.get('searchValueWashing_machine')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', washing_machines)),
        );
      });


    this.apiService.getDryersFromApi$()
      .pipe(first())
      .subscribe((dryers) => {
        this.dryers = dryers;
        this.filteredOptionsDryers = this.form.get('searchValueDryer')!.valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '', dryers)),
        );
      });

    this.apiService.getProfilesFromApi$(this.form.value.email!)
      .pipe(first())
      .subscribe((profiles) => {
        this.profiles = [];
        this.profiles.push(<Profiles>profiles);
      });


  };


  private _filter(value: string, object: any[]) {
    if (!object) return [];
    return object.filter(option => option?.Modell?.toLowerCase().includes(value.toLowerCase()) || option?.Marka?.toLowerCase().includes(value.toLowerCase()));
  }

  onSubmit() {
    if (this.form.valid && this.form.enabled) {
      this.form.value.email = this.userEmail;
      this.apiRequestInProgress = true;
      this.form.disable();
      this.http.post('http://localhost:3000/profiles', this.form.value).subscribe(response => {
        console.log(this.form.value.email);
        console.log('A mentés sikeres!', response);
        this.apiRequestInProgress = false;
        this.form.enable();
      }, error => {
        console.error('A mentés sikertelen!', error);
        this.show = true;
        this.apiRequestInProgress = false;
        this.form.enable();
      });
    }
    if (this.form.invalid && this.form.enabled) {
      this.form.markAllAsTouched();
    }
  }
  onSubmit2(){
    console.log(this.profiles);



  }


}
