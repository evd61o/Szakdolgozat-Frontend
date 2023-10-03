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
    return this.getCanLoadResult(this.loginService.getUserEmail());
  }
  // public canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree {
  //   return this.getCanLoadResult(segments, this.loginService.getUserEmail());
  // }

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
