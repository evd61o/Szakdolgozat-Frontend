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
    if (state.url === '/bejelentkezes' && !this.loginService.getUserEmail()) {
      // Az aktuális útvonal a bejelentkezés oldalra vezet, és a felhasználó nincs bejelentkezve
      return this.getCanLoadResult(this.loginService.getUserEmail());
    } else {
      if (state.url === '/kijelentkezes' || state.url === '/profil') {
        // Az aktuális útvonal kijelentkezés vagy profil oldalra vezet
        return this.getCanLoadResult(this.loginService.getUserEmail());
      } else {
        // Egyéb esetekben az útvonal elérhető, ha nincs speciális ellenőrzés
        return true;
      }
      return true;
    }
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

}
