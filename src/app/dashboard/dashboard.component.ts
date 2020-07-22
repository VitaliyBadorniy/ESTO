import {Component, OnInit} from '@angular/core';
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
    const  bodyOffsetHeight  = document.body.offsetHeight;
    const  elementScrollTop = ($event.target as Element).scrollTop;
    const  elementScrollHeight = ($event.target as Element).scrollHeight;
    if (bodyOffsetHeight + elementScrollTop  >= elementScrollHeight) {
      for (let i = 0; i < 14; i++) {
        this.photosService.getPhoto();
      }
    }
  };
}
