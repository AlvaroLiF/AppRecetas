import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { RecetaCrud } from '../interfaces/RecetasCrud';

@Injectable({
  providedIn: 'root'
})
export class RecetasCrudService {

  public url: string;

  public tokenAlmacenado: string = '';

  constructor(private http: HttpClient) {
    this.url = environment.urlReceta;
  }

  obtenerTodasLasRecetas(): Observable<any> {
    return this.http.get(this.url + 'allRecetas');
  }

  nuevaReceta(receta: RecetaCrud): Observable<any> {
    return this.http.post(this.url + 'newReceta', receta);
  }

  obtenerReceta(id: string): Observable<any> {
    return this.http.get(this.url + id);
  }

  actualizarReceta(id: string, receta: any): Observable<any> {
    return this.http.put(this.url + id, receta);
  }

  eliminarReceta(id: string): Observable<any> {
    return this.http.delete(this.url + id);
  }
}
