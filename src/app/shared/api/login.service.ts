import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userEmailSubject = new BehaviorSubject<string>('');

  setUserEmail(email: string): void {
    this.userEmailSubject.next(email);
  }

  getUserEmail(): BehaviorSubject<string> {
    return this.userEmailSubject;
  }
}
