import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EmailValidator, FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  public apiRequestInProgress: boolean = false;

  public form = this.fb.group({
    username: ['', Validators.required],
    email: [null, [Validators.email, Validators.required]],
    password: ['', Validators.required],

  });

  public show:boolean = false;

  constructor(private  http: HttpClient, private fb: FormBuilder){
  }

  onSubmit() {
    if (this.form.valid && this.form.enabled) {
      this.apiRequestInProgress = true;
      this.form.disable();
      this.http.post('http://localhost:3000/users', this.form.value).subscribe(response => {
        console.log('Sikeres Regisztráció', response);
        this.apiRequestInProgress = false;
        this.form.enable();
      }, error => {
        console.error('Regisztráció sikertelen', error);
        this.show = true;
        this.apiRequestInProgress = false;
        this.form.enable();
      });
    }
    if (this.form.invalid && this.form.enabled) {
      this.form.markAllAsTouched();
    }
  }
}


