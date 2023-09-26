import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import { LoginService} from "../../shared/api/login.service";
import {ApiService} from "../../shared/api/api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public apiRequestInProgress: boolean = false;
  public errorMessage = '';

  public form = this.fb.group({
    email: [null, [Validators.email, Validators.required]],
    password: ['', Validators.required],
    action: 'login'

  });

  constructor(private readonly apiService: ApiService, private fb: FormBuilder, private router: Router, private loginService: LoginService) {
  }

  onSubmit() {
    if (this.form.valid && this.form.enabled) {
      this.apiRequestInProgress = true;
      this.form.disable();
      this.apiService.login$(this.form.value).subscribe(
        response => {
          console.log('Sikeres bejelentkezés', response);
          this.apiRequestInProgress = false;
          this.form.enable();
          this.loginService.setUserEmail(this.form.value.email!);

          this.router.navigate(['/profil']);
          // Egyéb kezelés, például átirányítás
        }, (error) => {
          if (error.status === 401) {
            // Sikertelen bejelentkezés, jeleníts meg egy hibaüzenetet
            this.form.enable();
            this.errorMessage = 'Hibás e-mail cím vagy jelszó';
          } else {
            // Egyéb hiba, kezeld aszerint
          }
        }
      );

    }
    if (this.form.invalid && this.form.enabled) {
      this.form.markAllAsTouched();
    }

  }


}
