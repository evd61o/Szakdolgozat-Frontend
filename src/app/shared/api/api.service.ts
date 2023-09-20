import {Inject, Injectable, InjectionToken, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import { Observable } from "rxjs";
import {
  Dehumidifier,
  Dishwasher, Dryer,
  Freezer,
  Hot_plate,
  Microwave,
  Oven,
  Refrigerator,
  Washing_machine
} from "../../pages/interface/interfaces";

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

  public getSearchedRefrigeratorsFromApi$(selected_refrigerators_y_c: number): Observable<Refrigerator[]> {
    return this.httpClient.get<Refrigerator[]>(`${this.basePath}/hutok/${selected_refrigerators_y_c}`);
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

  public getSearchedHot_PlatesFromApi$(selected_hot_plate_c: number): Observable<Hot_plate[]> {
    return this.httpClient.get<Hot_plate[]>(`${this.basePath}/fozolapok/${selected_hot_plate_c}`);
  }

  public getMicrowavesFromApi$(): Observable<Microwave[]> {
    return this.httpClient.get<Microwave[]>(`${this.basePath}/mikrohullamu_sutok`);
  }
  public getDishwashersFromApi$(): Observable<Dishwasher[]> {
    return this.httpClient.get<Dishwasher[]>(`${this.basePath}/mosogatogepek`);
  }

  public getSearchedDishwashersFromApi$(selected_dishwasher_ep_c: number): Observable<Dishwasher[]> {
    return this.httpClient.get<Dishwasher[]>(`${this.basePath}/mosogatogepek/${selected_dishwasher_ep_c}`);
  }

  public getDehumidifiersFromApi$(): Observable<Dehumidifier[]> {
    return this.httpClient.get<Dehumidifier[]>(`${this.basePath}/paraelszivok`);
  }
  public getOvensFromApi$(): Observable<Oven[]> {
    return this.httpClient.get<Oven[]>(`${this.basePath}/sutok`);
  }

  public getSearchedOvensFromApi$(selected_oven_c: number): Observable<Oven[]> {
    return this.httpClient.get<Oven[]>(`${this.basePath}/sutok/${selected_oven_c}`);
  }

  public getWashing_machinesFromApi$(): Observable<Washing_machine[]> {
    return this.httpClient.get<Washing_machine[]>(`${this.basePath}/mosogepek`);
  }

  public getSearchedWashing_machinesFromApi$(selected_washing_m_ep40_60_c: number): Observable<Washing_machine[]> {
    return this.httpClient.get<Washing_machine[]>(`${this.basePath}/mosogepek/${selected_washing_m_ep40_60_c}`);
  }

  public getDryersFromApi$(): Observable<Dryer[]> {
    return this.httpClient.get<Dryer[]>(`${this.basePath}/szaritogepek`);
  }

  public getSearchedDryersFromApi$(selected_dryer_y_c: number): Observable<Dryer[]> {
    return this.httpClient.get<Dryer[]>(`${this.basePath}/szaritogepek/${selected_dryer_y_c}`);
  }

}

