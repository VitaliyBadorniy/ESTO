import {Injectable} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';
import {SharedModule} from '../shared.module';

@Injectable(
  {providedIn: SharedModule}
  )

export class LoadingService {

  private statusLoadingSubject = new BehaviorSubject<boolean>(false);
  statusLoading$ = this.statusLoadingSubject.asObservable();

  setStatusLoading(loadingState: boolean): void {
    this.statusLoadingSubject.next(loadingState);
  }


}

