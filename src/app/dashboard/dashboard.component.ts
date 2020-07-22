import {Component, HostListener, OnInit} from '@angular/core';
import {fromEvent} from 'rxjs';
import {PhotosService} from '../photos/services/photos.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private photosService: PhotosService,) {
  }

  ngOnInit(): void {
  }

  onScroll($event: Event): void {
    if (document.body.offsetHeight + ($event.target as Element).scrollTop >= ($event.target as Element).scrollHeight) {
      for (let i = 0; i < 9; i++) {
        this.photosService.getPhoto();
      }
    }
  };
}
