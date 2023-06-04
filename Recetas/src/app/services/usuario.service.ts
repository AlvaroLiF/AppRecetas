import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Storage } from "@ionic/storage";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { RespuestaGetToken } from "../interfaces/RespuestaGetToken";



@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    
    public url: string;
    
    public tokenAlmacenado: string = '';

    constructor(private http: HttpClient,
        private router: Router, private storage: Storage) {
        this.url = environment.urlUsuario;
    }

    register(form: any): Observable<any> {
        return this.http.post(this.url + 'newUser', { usuario: form.usuario, email: form.email, pwd: form.pwd, edad: form.edad });
    }

    login(form: any): Observable<any> {
        return this.http.post(this.url + 'login', { usuario: form.usuario, pwd: form.pwd });
    }

    logout(): void {
        localStorage.removeItem("token");
    }

    isLoggedIn(): boolean {
       return !!localStorage.getItem("token");
      }

    getToken() {
        return localStorage.getItem("token");
    }

    cargarToken() {
        this.tokenAlmacenado = JSON.parse(localStorage.getItem('token') || '{}');
    }

    setSession(authResult: RespuestaGetToken) {
        localStorage.setItem('token', JSON.stringify(authResult.token!));
    }

    async renewToken(): Promise<boolean> {
        this.cargarToken();
        if (!this.tokenAlmacenado) {
            this.logout();
            console.log('nos vamos al login');
            this.router.navigate(['/login']);
            return Promise.resolve(false);
        }
        return new Promise<boolean>((resolve) => {
            this.http.get<RespuestaGetToken>(this.url + 'renewToken')
                .subscribe(async (respuesta: RespuestaGetToken) => {
                    if (respuesta.status == 'ok') {
                        this.setSession(respuesta);
                        resolve(true);
                    }
                    else {
                        this.logout();
                        resolve(false);
                    }
                });
        });
    }
}