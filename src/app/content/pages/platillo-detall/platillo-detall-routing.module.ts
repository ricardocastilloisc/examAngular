import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatilloDetallComponent } from './platillo-detall.component';

const routes: Routes = [{ path: ':id', component: PlatilloDetallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatilloDetallRoutingModule { }
