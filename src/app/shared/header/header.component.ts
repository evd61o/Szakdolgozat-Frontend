import { Component } from '@angular/core';
import {ApiService} from "../api/api.service";
import {HttpClient} from "@angular/common/http";
import {FormBuilder} from "@angular/forms";
import {LoginService} from "../api/login.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(public readonly loginService: LoginService) {
  }

}
