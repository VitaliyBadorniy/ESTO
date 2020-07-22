import {Injectable} from '@angular/core';
import {SharedModule} from '../shared.module';

@Injectable(
  {providedIn: SharedModule}
)

export class StorageService {
  storeString(key: string, value: string): void {
    localStorage.setItem(key, value);
  };

  hasKey(key: string): boolean {
    return !!localStorage.getItem(key);
  }

  getString(key: string): string {
    return localStorage.getItem(key);
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
