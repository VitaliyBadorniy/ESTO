import {Component, OnDestroy, OnInit} from '@angular/core';
import {PhotoModel} from '../photos/models/photo.model';
import {Observable, Subject, Subscribable, Subscription} from 'rxjs';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';
import {PhotosService} from '../photos/services/photos.service';
import {ActivatedRoute, Router} from '@angular/router';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit, OnDestroy {
  id = '';
  photo: PhotoModel;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';
  routeSubscription: Subscription;
  photoSubscription: Subscription;
  private componentDestroyed = new Subject();

  constructor(private photosService: PhotosService,
              private snackBar: MatSnackBar,
              private router: Router,
              private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getIdForomRoute();
    this.getPhotoFromPhotos();
  }

  ngOnDestroy(): void {
    this.componentDestroyed.next();
  }

  getIdForomRoute(): void {
    this.routeSubscription = this.activateRoute.params.pipe(
      takeUntil(this.componentDestroyed)
    ).subscribe(params => this.id = params[`id`]);
  }

  getPhotoFromPhotos(): void {
    this.photoSubscription = this.photosService.photos$
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(photos => {
        this.photo = photos.find(photo => photo.id === this.id);
      });
  }

  removeFromFavorites(photo: PhotoModel): void {
    photo.isFavourite = false;
    this.photosService.updateFavoritePhoto(photo);
    this.snackBar.open('Removed from favorites!!', 'End now', {
      duration: 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
    this.router.navigate(['/favorites']);
  }
}
