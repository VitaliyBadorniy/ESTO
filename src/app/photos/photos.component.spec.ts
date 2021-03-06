import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotosComponent} from './photos.component';
import {PhotosService} from './services/photos.service';
import {StorageService} from '../shared/services/storage.service';
import {LoadingService} from '../shared/services/loading.service';
import {RouterTestingModule} from '@angular/router/testing';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PhotoModel} from './models/photo.model';


describe('PhotosComponent', () => {
  let component: PhotosComponent;
  let fixture: ComponentFixture<PhotosComponent>;
  let photosService: PhotosService;
  beforeEach(async(() => {
    photosService = new PhotosService(null, null);
    component = new PhotosComponent(photosService, null);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      declarations: [PhotosComponent],
      providers: [PhotosService,
        StorageService,
        LoadingService
      ]

    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('service should return photo model', async(() => {
    const photo: PhotoModel = {id: 'dsdsdsd-sd4553s-dsfds', isFavourite: true, photoURL: ''};
    photosService.setBufferPhoto(photo);
    expect(photosService.getBufferPhotos().length).toBeGreaterThanOrEqual(1);

  }));
});
