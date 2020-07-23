import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'ESTO';
  load = false;

  constructor(private loadingService: LoadingService,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
   this.loadingService.statusLoading$.subscribe(statusLoading => {
     this.load = statusLoading;
     this.changeDetectorRef.detectChanges();
   });
  }
}
