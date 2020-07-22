import {Injectable} from '@angular/core';
import * as faker from 'faker/locale/en';
import {BehaviorSubject} from 'rxjs';
import {getRandomDebounce} from '../../shared/functions/randomDebounce';
import {PhotoModel} from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  readonly minRangeDebounce = 100;
  readonly maxRangeDebounce = 300;
  private bufferPhotos: PhotoModel[] = [];
  private photoSource = new BehaviorSubject<PhotoModel[]>([]);
  photos$ = this.photoSource.asObservable();

  constructor() {
  }

  getPhoto(): void {
    const randomDuration = getRandomDebounce(this.minRangeDebounce, this.maxRangeDebounce);
    setTimeout(() => {
      const generatedPhoto = {
        id: faker.random.uuid(),
        photoURL: faker.image.avatar(),
        isFavourite: false
      };
      this.setBufferPhotos(generatedPhoto);
    }, randomDuration);
  }

  isBufferPhotosLength(): boolean {
    return !!this.bufferPhotos.length;
  }
  setBufferPhotos(photo: PhotoModel): void {
    this.bufferPhotos.push(photo);
    this.photoSource.next(this.bufferPhotos);
  }


}
