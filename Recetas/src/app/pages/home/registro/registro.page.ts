import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-registro',
  templateUrl: 'registro.page.html',
  styleUrls: ['registro.page.scss'],
})
export class RegistroPage {
  registroForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private usuarioService: UsuarioService) {
    this.registroForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      pwd: ['', [Validators.required, Validators.minLength(6)]],
      edad: ['', Validators.required],
    });
  }

  volverAtras() {
    window.history.back();
  }

  onSubmit() {
    if (this.registroForm.valid) {
      this.usuarioService.register(this.registroForm.value).subscribe(
        (response) => {
          console.log(response); // Manejar la respuesta del servidor
          // Realizar acciones adicionales según sea necesario, como redirigir a otra página
        },
        (error) => {
          console.error(error); // Manejar el error de la petición
          // Mostrar un mensaje de error al usuario o tomar otras acciones
        }
      );
    }
  }
}
