import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {PhotosService} from '../photos/services/photos.service';
import {StorageService} from '../shared/services/storage.service';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';
import {PhotoModel} from '../photos/models/photo.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  photosSubscription: Subscription;
  favouritePhotos: PhotoModel[] = [];
  readonly maxPhotoCount = 14;

  @HostListener('window:beforeunload') store(): void {
    this.photosService.backupFavouritePhotos();
  }

  constructor(private photosService: PhotosService,
              private storageService: StorageService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.restoreFavoritePhotos();
    this.getFavouritePhotos();
  }

  ngOnDestroy(): void {
    if (this.photosSubscription) {
      this.photosSubscription.unsubscribe();
    }
  }

  onScroll($event: Event): void {
    const bodyOffsetHeight = document.body.offsetHeight;
    const elementScrollTop = ($event.target as Element).scrollTop;
    const elementScrollHeight = ($event.target as Element).scrollHeight;
    const isRouterOnPhotos = this.router.url === '/';
    if (bodyOffsetHeight + elementScrollTop >= elementScrollHeight && isRouterOnPhotos) {
      for (let i = 0; i < this.maxPhotoCount; i++) {
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

  getFavouritePhotos(): void {
    this.photosSubscription = this.photosService.photos$.pipe(
      map(photos => photos.filter(photo => photo.isFavourite === true))
    ).subscribe(favouritePhotos => this.favouritePhotos = favouritePhotos);
  }
}
