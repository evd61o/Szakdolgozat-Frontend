import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginData = {
    username: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onSubmit() {
    this.http.post('http://localhost:3000/users', this.loginData).subscribe(response => {
      console.log('Sikeres bejelentkezés', response);
      // Egyéb kezelés, például átirányítás
    }, error => {
      console.error('Bejelentkezés sikertelen', error);
    });
  }

}
