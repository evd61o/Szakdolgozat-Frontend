import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { LoginService} from "../../shared/api/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  public errorMessage = '';

  public form = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: ['', Validators.required],
    action: 'login'

  });

  constructor(private http: HttpClient, private fb: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  onSubmit() {
    this.http.post('http://localhost:3000/users', this.form.value).subscribe(response => {
        console.log('Sikeres bejelentkezés', response);
        this.loginService.setUserEmail(this.form.value.email!);
        this.router.navigate(['/profil']);
        // Egyéb kezelés, például átirányítás
      }, (error) => {
        if (error.status === 401) {
          // Sikertelen bejelentkezés, jeleníts meg egy hibaüzenetet
          this.errorMessage = 'Hibás email cím vagy jelszó';
        } else {
          // Egyéb hiba, kezeld aszerint
        }
      }
    );
  }


}
