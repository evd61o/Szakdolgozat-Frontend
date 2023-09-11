import {Inject, Injectable, InjectionToken, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import { Observable } from "rxjs";
import {Dehumidifier, Dishwasher, Freezer, Hot_plate, Microwave, Oven, Refrigerator} from "../interface/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected basePath = 'http://localhost:3000';

  constructor(protected httpClient: HttpClient) {
  }

  /*public getRefrigeratorsFromApi$(): Observable<Array<Refrigerator>>;
  /*public getRefrigeratorsFromApi$(): Observable<HttpResponse<Array<Refrigerator>>>;*/
  /*public getRefrigeratorsFromApi$(): Observable<HttpEvent<Array<Refrigerator>>>;*/

  public getRefrigeratorsFromApi$(searchValueRefrigerator: string): Observable<Refrigerator> {
    return this.httpClient.get<Refrigerator>(`${this.basePath}/hutok/${searchValueRefrigerator}`);
  }
  public getFreezersFromApi$(searchValueFreezer: string): Observable<Freezer> {
    return this.httpClient.get<Freezer>(`${this.basePath}/fagyasztok/${searchValueFreezer}`);
  }
  public getHot_PlatesFromApi$(searchValueHot_plate: string): Observable<Hot_plate> {
    return this.httpClient.get<Hot_plate>(`${this.basePath}/fozolapok/${searchValueHot_plate}`);
  }
  public getMicrowavesFromApi$(searchValueMicrowave: string): Observable<Microwave> {
    return this.httpClient.get<Microwave>(`${this.basePath}/mikrohullamu_sutok/${searchValueMicrowave}`);
  }
  public getDishwashersFromApi$(searchValueDishwasher: string): Observable<Dishwasher> {
    return this.httpClient.get<Dishwasher>(`${this.basePath}/mosogatogepek/${searchValueDishwasher}`);
  }
  public getDehumidifiersFromApi$(searchValueDehumidifier: string): Observable<Dehumidifier> {
    return this.httpClient.get<Dehumidifier>(`${this.basePath}/paraelszivok/${searchValueDehumidifier}`);
  }
  public getOvensFromApi$(searchValueOven: string): Observable<Oven> {
    return this.httpClient.get<Oven>(`${this.basePath}/sutok/${searchValueOven}`);
  }
}

