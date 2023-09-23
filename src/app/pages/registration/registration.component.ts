import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public apiRequestInProgress: boolean = false;
  public errorMessage = '';
  public show:boolean = false;

  public form = this.fb.group({
    username: ['', Validators.required],
    email: [null, [Validators.email, Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', Validators.required],
    action: 'register'

  });

  constructor(private  http: HttpClient, private fb: FormBuilder, private router: Router){
  }

  onSubmit() {
    if (this.form.valid && this.form.enabled) {
      this.apiRequestInProgress = true;
      this.form.disable();
      this.http.post('http://localhost:3000/users', this.form.value).subscribe(response => {
        console.log('Sikeres Regisztráció!', response);
        this.router.navigate(['/bejelentkezes']);
        this.apiRequestInProgress = false;
        this.form.enable();
      }, error => {
        console.error('Regisztráció sikertelen!', error);
        this.show = true;
        if (error.status == 409){
          this.show = true;
          this.errorMessage = "Ez a felhasználónév már foglalt!";
        }
        if (error.status == 410){
          this.show = true;
          this.errorMessage = "Az e-mail címmel már létezik felhasználó!";
        }
        this.apiRequestInProgress = false;
        this.form.enable();
      });
    }
    if (this.form.invalid && this.form.enabled) {
      this.form.markAllAsTouched();
    }
  }
}


