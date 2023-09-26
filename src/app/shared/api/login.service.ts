import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Profiles} from "../../pages/interface/interfaces";

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private userEmail: string = "";
  private userProfil!: Profiles;

  public setUserEmail(email: string): void {
    this.userEmail = email;
    localStorage.setItem("email", email);
  }

  public getUserEmail(): string {
    if (this.userEmail === "" && localStorage.getItem("email") !== "") {
      this.userEmail = localStorage.getItem("email")!;
    }
    return this.userEmail;
  }

  public removeData(key: string) {
    localStorage.removeItem("email");
  }

  public clearData() {
    localStorage.clear();
  }
}
