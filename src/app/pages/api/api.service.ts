import {Inject, Injectable, InjectionToken, Optional} from "@angular/core";
import {HttpClient, HttpEvent, HttpResponse} from "@angular/common/http";
import { Observable } from "rxjs";


export interface Refrigerator {
  Marka?: string;
  Modell?: string;
  Tipus?: string;
  Meret?: number;
  Energiahatekonysagi_osztaly?: string;
  Fogyasztasev?: number;
  Fogyasztasnfap?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected basePath = 'http://localhost:3000';

  constructor(protected httpClient: HttpClient) {
  }

  public getRefrigeratorsFromApi$(): Observable<Array<Refrigerator>>;
  public getRefrigeratorsFromApi$(): Observable<HttpResponse<Array<Refrigerator>>>;
  public getRefrigeratorsFromApi$(): Observable<HttpEvent<Array<Refrigerator>>>;
  public getRefrigeratorsFromApi$(): Observable<any> {

    /*this.httpClient.request<Array<Refrigerator>>('get',`${this.basePath}/api/v1/flight-cancellation/${encodeURIComponent(String(id))}`)*/
    return this.httpClient.request<Array<Refrigerator>>('get',`${this.basePath}/hutok`)
  }
}

