import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhotoDetailComponent} from './photo-detail.component';
import {PhotosService} from '../photos/services/photos.service';
import {StorageService} from '../shared/services/storage.service';
import {LoadingService} from '../shared/services/loading.service';
import {SharedModule} from '../shared/shared.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';

describe('PhotoDetailComponent', () => {
  let component: PhotoDetailComponent;
  let fixture: ComponentFixture<PhotoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        SharedModule,
        NoopAnimationsModule
      ],
      declarations: [ PhotoDetailComponent ],
      providers:  [
        PhotosService,
        StorageService,
        LoadingService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
