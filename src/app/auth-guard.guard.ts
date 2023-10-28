import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot, CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {LoginService} from "./shared/api/login.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private readonly router: Router, private readonly loginService: LoginService ) {}

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree {
    if (state.url === '/bejelentkezes' || state.url === '/regisztracio') {
      return this.getCanLoadResult(this.loginService.getUserEmail());
    } else if (state.url === '/kijelentkezes' || state.url === '/profil') {
      return this.getCanLoadResult2(this.loginService.getUserEmail());
    }
    // Alapértelmezett visszatérési érték, ha nincs illeszkedő forgatókönyv
    return false; // vagy visszairányítás egy UrlTree-vel
  }

  private getCanLoadResult(
    userEmail: string
  ): boolean | UrlTree {
    if (!userEmail) {
      return true;
    } else {
      return this.router.createUrlTree([""]);
    }
  }

  private getCanLoadResult2(
    userEmail: string
  ): boolean | UrlTree {
    if (userEmail) {
      return true;
    } else {
      return this.router.createUrlTree([""]);
    }
  }

}
