import { Component } from '@angular/core';
import {LoginService} from "../api/login.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(public readonly loginService: LoginService) {
  }

}
