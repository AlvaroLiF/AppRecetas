import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService, private router: Router) {
    this.loginForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      pwd: ['', Validators.required],
    });
  }

  volverAtras() {
    window.history.back();
  }

  login() {
    if (this.loginForm.valid) {
      this.usuarioService.login(this.loginForm.value).subscribe(
        (response) => {
          // Handle successful login
          console.log('Login successful:', response);
          localStorage.setItem('token', JSON.stringify(response.token));
          //localStorage.removeItem('token');
          // Redirect or perform additional actions
          console.log(response.token);
          this.router.navigate(['home/recetas']);
        },
        (error) => {
          // Handle login error
          console.error('Login error:', error);
          // Display error message or perform additional actions
        }
      );
    }
  }

}
