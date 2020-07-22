import {Component, HostListener, OnInit} from '@angular/core';
import {PhotosService} from './services/photos.service';
import {Observable, zip} from 'rxjs';
import {PhotoModel} from './models/photo.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import {tap} from 'rxjs/operators';
import {StorageService} from '../shared/services/storage.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photosAsync$: Observable<PhotoModel[]>;
  photos: PhotoModel[] = [];
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private photosService: PhotosService,
              private snackBar: MatSnackBar,
              private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.photosAsync$ = this.photosService.photos$.pipe(
      tap(x => this.photos = x)
    );
    if (!this.photosService.isBufferPhotosLength()) {
      for (let i = 0; i < 15; i++) {
        this.photosService.getPhoto();
      }
    }
  }

  setFavouritePhoto(photo: PhotoModel): void {
    photo.isFavourite = true;
    this.updateFavoritePhoto(photo);
    this.snackBar.open('Add to favorites!!', 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  updateFavoritePhoto(favoritePhoto: PhotoModel): void {
    const updatedPhoto = this.photos.find(this.findIndexToUpdate, favoritePhoto.id);
    const index = this.photos.indexOf(updatedPhoto);
    this.storageService.storeString('test', 'testdddd');
    this.photos[index] = favoritePhoto;
    this.photosService.setBufferPhotos(this.photos);
  }

  findIndexToUpdate(newItem): boolean {
    return newItem.id === this;
  }


}
