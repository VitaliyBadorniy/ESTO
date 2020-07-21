import {NgModule} from '@angular/core';
import {MaterialModule} from './framework/material.module';
import {HoverDirective} from './directives/hover.directive';


@NgModule({
  declarations: [HoverDirective],
  imports: [MaterialModule],
  exports: [
    MaterialModule,
    HoverDirective
  ]
})


export class SharedModule {
}
