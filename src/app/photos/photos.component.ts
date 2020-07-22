import {Component, HostListener, OnInit} from '@angular/core';
import {PhotosService} from './services/photos.service';
import {Observable, zip} from 'rxjs';
import {PhotoModel} from './models/photo.model';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  photosAsync$: Observable<PhotoModel[]>;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  constructor(private photosService: PhotosService,
              private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.photosAsync$ = this.photosService.photos$;
    if (!this.photosService.isBufferPhotosLength()) {
      for (let i = 0; i < 15; i++) {
        this.photosService.getPhoto();
      }
    }
  }

  openSnackBar(): void {
    this.snackBar.open('Add to favorites!!', 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
