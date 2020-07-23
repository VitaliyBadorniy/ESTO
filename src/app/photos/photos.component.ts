import {Component, OnInit} from '@angular/core';
import {PhotosService} from './services/photos.service';
import {Observable} from 'rxjs';
import {PhotoModel} from './models/photo.model';
import {MatSnackBar,
        MatSnackBarHorizontalPosition,
        MatSnackBarVerticalPosition} from '@angular/material/snack-bar';


@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photosAsync$: Observable<PhotoModel[]>;
  readonly maxPhotoCount = 15;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private photosService: PhotosService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.photosAsync$ = this.photosService.photos$;
    this.fetchPhotos();
  }

 fetchPhotos(): void {
   if (!this.photosService.isBufferPhotosEnoughLength()) {
     for (let i = 0; i < this.maxPhotoCount; i++) {
       this.photosService.getPhoto();
     }
   }
 }

  setFavouritePhoto(photo: PhotoModel): void {
    this.snackBar.open(photo.isFavourite ?
      ' Hey! This photo already added to favorites!!' : 'Added to favorites!!', 'End now', {
      duration: 2000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    photo.isFavourite = true;
    this.photosService.updateFavoritePhoto(photo);
  }
}
