import {NgModule} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCardModule } from '@angular/material/card';
@NgModule({
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatBadgeModule,
    MatCardModule
  ]
})

export class MaterialModule {}
