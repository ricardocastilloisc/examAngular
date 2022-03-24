import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlatilloDetallRoutingModule } from './platillo-detall-routing.module';
import { PlatilloDetallComponent } from './platillo-detall.component';


@NgModule({
  declarations: [
    PlatilloDetallComponent
  ],
  imports: [
    CommonModule,
    PlatilloDetallRoutingModule
  ]
})
export class PlatilloDetallModule { }
