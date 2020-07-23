import {Component, HostListener, OnInit} from '@angular/core';
import {PhotosService} from '../photos/services/photos.service';
import {StorageService} from '../shared/services/storage.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  @HostListener('window:beforeunload') store(): void {
    this.photosService.backupFavouritePhotos();
  }
  constructor(private photosService: PhotosService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.restoreFavoritePhotos();
  }

  onScroll($event: Event): void {
    const  bodyOffsetHeight  = document.body.offsetHeight;
    const  elementScrollTop = ($event.target as Element).scrollTop;
    const  elementScrollHeight = ($event.target as Element).scrollHeight;
    const  statusRouter = this.router.url === '/';
    if (bodyOffsetHeight + elementScrollTop >= elementScrollHeight && statusRouter) {
      for (let i = 0; i < 14; i++) {
        this.photosService.getPhoto();
      }
    }
  }

  restoreFavoritePhotos(): void {
    if (this.storageService.hasKey('favourite_photos')) {
      const favoritePhotos = JSON.parse(this.storageService.getString('favourite_photos'));
      this.photosService.setBufferPhotos(favoritePhotos);
    }
  }
}
