import { Injectable } from '@angular/core';
import { fromEvent, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConnectivityService {
  private onlineChangesSource = new Subject<boolean>();
  public onlineChanges$ = this.onlineChangesSource.asObservable();

  constructor() {
    this.handleAppConnectivityChanges();
  }

  private handleAppConnectivityChanges(): void {
    fromEvent(window, 'online').subscribe(() => {
      this.onlineChangesSource.next(true);
    });

    fromEvent(window, 'offline').subscribe(() => {
      this.onlineChangesSource.next(false);
    });
  }
}
