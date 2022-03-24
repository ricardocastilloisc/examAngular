import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlatillosComponent } from './platillos.component';

const routes: Routes = [{ path: '', component: PlatillosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlatillosRoutingModule { }
