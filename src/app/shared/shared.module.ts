import {NgModule} from '@angular/core';
import {MaterialModule} from './framework/material.module';
import { ErrorPageComponent } from './components/error-page/error-page.component';



@NgModule({
  declarations: [ErrorPageComponent],
  imports: [MaterialModule],
  exports: [
    MaterialModule
  ]
})


export class SharedModule {
}
