import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PhotoModel} from '../photos/models/photo.model';
import {PhotosService} from '../photos/services/photos.service';
import {map} from 'rxjs/operators';
import {Router} from '@angular/router';

@Component({
  selector: 'app-photos-favorites',
  templateUrl: './photos-favorites.component.html',
  styleUrls: ['./photos-favorites.component.scss']
})
export class PhotosFavoritesComponent implements OnInit {
  favouritePhotosAsync$: Observable<PhotoModel[]>;

  constructor(private photosService: PhotosService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.favouritePhotosAsync$ = this.photosService.photos$.pipe(
      map(photos => photos.filter(photo => photo.isFavourite === true))
    );
  }

  openFavouritePhoto(photo: PhotoModel): void {
    this.router.navigate(['/photos', photo.id]);
  }
}
