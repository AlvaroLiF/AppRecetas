import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private _storage: Storage | null = null;

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    this._storage = await this.storage.create();
  }

  public guardaElemento(key:string, value:any){
    this._storage?.set(key,value);
  }

  public async getElemento(key:string){
    const elemento = await this._storage?.get(key);
    return elemento;
  }

  public async borraElemento(key:string){
    await this._storage?.remove(key);
  }
}
