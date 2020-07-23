import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotosFavoritesComponent } from './photos-favorites.component';
import {PhotosService} from '../photos/services/photos.service';
import {StorageService} from '../shared/services/storage.service';
import {LoadingService} from '../shared/services/loading.service';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

describe('PhotosFavoritesComponent', () => {
  let component: PhotosFavoritesComponent;
  let fixture: ComponentFixture<PhotosFavoritesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      declarations: [ PhotosFavoritesComponent ],
      providers:  [
        PhotosService,
        StorageService,
        LoadingService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosFavoritesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
