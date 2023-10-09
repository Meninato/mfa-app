import { Injectable } from "@angular/core";

export type StorageKeys = 'token';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  setItem(key: StorageKeys, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: StorageKeys): T | null {
    const item: string | null = localStorage.getItem(key);
    return item !== null ? (JSON.parse(item) as T) : null;
  }

  removeItem(key: StorageKeys): void {
    localStorage.removeItem(key);
  }
}