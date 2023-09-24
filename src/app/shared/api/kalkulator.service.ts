import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class KalkulatorService {
  private asd = new BehaviorSubject<number>(0);

  setPower_Consumption_Daily(power_consumption_daily: number): void {
    this.asd.next(power_consumption_daily);
  }

  getPower_Consumption_Daily(): BehaviorSubject<number> {
    return this.asd;
  }
}
