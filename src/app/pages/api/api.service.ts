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
  public getRefrigeratorsFromApi$(): Observable<Refrigerator[]> {
    return this.httpClient.get<Refrigerator[]>(`${this.basePath}/hutok`);
  }
  public getFreezersFromApi$(): Observable<Freezer[]> {
    return this.httpClient.get<Freezer[]>(`${this.basePath}/fagyasztok`);
  }



  public getSearchedFreezersFromApi$(selected_freezer_y_c: number): Observable<Freezer[]> {
    return this.httpClient.get<Freezer[]>(`${this.basePath}/fagyasztok/${selected_freezer_y_c}`);
  }




  public getHot_PlatesFromApi$(): Observable<Hot_plate[]> {
    return this.httpClient.get<Hot_plate[]>(`${this.basePath}/fozolapok`);
  }
  public getMicrowavesFromApi$(): Observable<Microwave[]> {
    return this.httpClient.get<Microwave[]>(`${this.basePath}/mikrohullamu_sutok`);
  }
  public getDishwashersFromApi$(): Observable<Dishwasher[]> {
    return this.httpClient.get<Dishwasher[]>(`${this.basePath}/mosogatogepek`);
  }
  public getDehumidifiersFromApi$(): Observable<Dehumidifier[]> {
    return this.httpClient.get<Dehumidifier[]>(`${this.basePath}/paraelszivok`);
  }
  public getOvensFromApi$(): Observable<Oven[]> {
    return this.httpClient.get<Oven[]>(`${this.basePath}/sutok`);
  }
}

