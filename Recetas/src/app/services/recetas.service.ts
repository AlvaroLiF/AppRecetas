import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, map, Observable } from 'rxjs';
import { Receta } from '../interfaces/recetas';
import { Storage } from '@ionic/storage';
import { v4 as uuidv4 } from 'uuid';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecetasService {

  private readonly apiUrl = 'assets/data/recetas.json'

  private recetasFavoritas: Receta[] = [];
  
  private readonly RECETAS_KEY = 'recetasguardadas';

  private recetas: Receta[] = [];

  constructor(
    private storage: Storage,
    private http: HttpClient,
    private router: Router
    ) { this.initStorage()}

    private initStorage() {
      this.storage.create().then(() => {
        console.log('Database created');
      }).catch(error => {
        console.error('Error creating database', error);
      });
    }

  getRecetas(): Observable<Receta[]> {
    return this.http.get<Receta[]>(this.apiUrl);
  }

  getRecetaById(id:string): Observable<Receta | undefined> {
    return this.getRecetas().pipe(
      map(recetas => recetas.find(receta => receta.id === id))
    );
  }

  getRecetaStorageById(id:string): Observable<Receta | undefined> {
    return this.getRecetasStorage().pipe(
      map(recetas => recetas.find(receta => receta.id === id))
    );
  }

  agregarRecetaFavorita(receta: Receta) {
    if (!this.esRecetaFavorita(receta)) {
      this.recetasFavoritas.push(receta);
    }
  }

  eliminarRecetaFavorita(receta: Receta) {
    const index = this.recetasFavoritas.findIndex((r) => r.id === receta.id);
    if (index !== -1) {
      this.recetasFavoritas.splice(index, 1);
    }
  }

  esRecetaFavorita(receta: Receta): boolean {
    return this.recetasFavoritas.some((r) => r.id === receta.id);
  }

  getRecetasFavoritas(): Receta[] {
    return this.recetasFavoritas;
  }

  verRecetasFavoritas() {
    console.log(this.recetasFavoritas);
  }

  generarId(): string {
    return uuidv4();
  }

  agregarReceta(receta: Receta) {
    this.storage.get(this.RECETAS_KEY).then((recetas: Receta[]) => {
      const recetasGuardadas = recetas || [];
      recetasGuardadas.push(receta);
      this.storage.set(this.RECETAS_KEY, recetasGuardadas);
      this.router.navigate(['home/recetas']);
    });
  }

  eliminarReceta(receta: Receta) {
    this.storage.get(this.RECETAS_KEY).then((recetas: Receta[]) => {
      const recetasGuardadas = recetas || [];
      const index = recetasGuardadas.findIndex((r) => r.id === receta.id);
      if (index !== -1) {
        recetasGuardadas.splice(index, 1);
        this.storage.set(this.RECETAS_KEY, recetasGuardadas);
      }
    });
  }

  getRecetasStorage(): Observable<Receta[]> {
    return from(this.storage.get(this.RECETAS_KEY));
  }

  verRecetas() {
    console.log(this.recetas);
  }

  verRecetasGuardadas() {
    this.getRecetasStorage().subscribe(recetas => {
      console.log(recetas);
    });
}

}
