import {Injectable} from '@angular/core';
import * as faker from 'faker/locale/en';
import {BehaviorSubject} from 'rxjs';
import {getRandomDebounce} from '../../shared/functions/randomDebounce';
import {PhotoModel} from '../models/photo.model';
import {StorageService} from '../../shared/services/storage.service';
import {LoadingService} from '../../shared/services/loading.service';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  readonly minRangeDebounce = 200;
  readonly maxRangeDebounce = 300;
  readonly minScrollValue = 10;
  private bufferPhotos: PhotoModel[] = [];
  private photoSource = new BehaviorSubject<PhotoModel[]>([]);
  photos$ = this.photoSource.asObservable();

  constructor(private storageService: StorageService,
              private loadingService: LoadingService) {
  }

  getPhoto(): void {
    this.loadingService.setStatusLoading(true);
    const randomDuration = getRandomDebounce(this.minRangeDebounce, this.maxRangeDebounce);
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
    const favouritePhotos = this.bufferPhotos.filter(photo => photo.isFavourite === true);
    if (this.storageService.hasKey('favourite_photos')) {
      this.storageService.remove('favourite_photos');
    }
    this.storageService.storeString('favourite_photos', JSON.stringify(favouritePhotos));
  }

}
