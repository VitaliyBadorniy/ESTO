import {NgModule} from '@angular/core';
import {MaterialModule} from './framework/material.module';
import {HoverDirective} from './directives/hover.directive';
import { ErrorPageComponent } from './components/error-page/error-page.component';



@NgModule({
  declarations: [HoverDirective, ErrorPageComponent],
  imports: [MaterialModule],
  exports: [
    MaterialModule,
    HoverDirective
  ]
})


export class SharedModule {
}
