import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }
  
  public exists(key: string): boolean {
    return localStorage.getItem(key) ? true : false;
  }

  public get(key: string): string | null {
    return this.exists(key) ? localStorage.getItem(key) : null;
  }
  
  public set(key: string, value: any): void {
    if (this.exists(key))
      return;
    
    localStorage.setItem(key, value);
  }

  public destroy(): void {
    localStorage.clear()
  }

  public remove(key: string): void {
    if (this.exists(key))
      localStorage.removeItem(key);

    return;
  }  
}
