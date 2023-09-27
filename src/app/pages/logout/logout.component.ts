import { Component } from '@angular/core';
import {LoginService} from "../../shared/api/login.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private loginService: LoginService, private router: Router) {
  }

  onSubmit(){
    let userEmail = this.loginService.getUserEmail();
    this.loginService.removeData(userEmail);
    this.router.navigate(['']).then(() => {
      // Oldal frissítése
      window.location.reload();
    });
  }

}
