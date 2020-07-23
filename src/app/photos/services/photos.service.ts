import {Injectable} from '@angular/core';
import * as faker from 'faker/locale/en';
import {BehaviorSubject} from 'rxjs';
import {PhotoModel} from '../models/photo.model';
import {StorageService} from '../../shared/services/storage.service';
import {LoadingService} from '../../shared/services/loading.service';
import {getRandomDelay} from '../../shared/functions/randomDelay';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  readonly minRangeDelay  = 200;
  readonly maxRangeDelay  = 300;
  readonly minScrollValue = 10;
  private bufferPhotos: PhotoModel[] = [];

  private photoSource = new BehaviorSubject<PhotoModel[]>([]);
  photos$ = this.photoSource.asObservable();

  constructor(private storageService: StorageService,
              private loadingService: LoadingService) {
  }

  getPhoto(): void {
    this.loadingService.setStatusLoading(true);
    const randomDuration = getRandomDelay(this.minRangeDelay , this.maxRangeDelay);
    setTimeout(() => {
      const generatedPhoto = {
        id: faker.random.uuid(),
        photoURL: faker.image.avatar(),
        isFavourite: false
      };
      this.setBufferPhoto(generatedPhoto);
      this.loadingService.setStatusLoading(false);
    }, randomDuration);
  }

  isBufferPhotosEnoughLength(): boolean {
    return !!this.bufferPhotos.length && this.bufferPhotos.length > this.minScrollValue;
  }

  setBufferPhoto(photo: PhotoModel): void {
    this.bufferPhotos.push(photo);
    this.photoSource.next(this.bufferPhotos);
  }
  getBufferPhotos(): PhotoModel[] {
   return  this.bufferPhotos;
  }

  setBufferPhotos(photos: PhotoModel[]): void {
    this.bufferPhotos = photos;
    this.photoSource.next(this.bufferPhotos);
  }

  updateFavoritePhoto(favoritePhoto: PhotoModel): void {
    const updatedPhoto = this.bufferPhotos.find(this.findIndexToUpdate, favoritePhoto.id);
    const index = this.bufferPhotos.indexOf(updatedPhoto);
    this.bufferPhotos[index] = favoritePhoto;
    this.setBufferPhotos(this.bufferPhotos);
  }

  findIndexToUpdate(newItem): boolean {
    return newItem.id === this;
  }

  backupFavouritePhotos(): void {
    const favouritePhotos = this.getBufferPhotos().filter(photo => photo.isFavourite === true);
    if (this.storageService.hasKey('favourite_photos')) {
      this.storageService.remove('favourite_photos');
    }
    this.storageService.storeString('favourite_photos', JSON.stringify(favouritePhotos));
  }
}
