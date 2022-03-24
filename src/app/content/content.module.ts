import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { ContentComponent } from './content.component';
import { MenuComponent } from './menu/menu.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LayoutModule } from '@angular/cdk/layout';
import { FormsModule } from '@angular/forms';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogPlatilloRandomComponent } from './pages/welcome/dialog-platillo-random/dialog-platillo-random.component';

@NgModule({

  entryComponents: [
    DialogPlatilloRandomComponent,
  ],
  declarations: [ContentComponent, MenuComponent, WelcomeComponent, DialogPlatilloRandomComponent],
  imports: [
    CommonModule,
    ContentRoutingModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    LayoutModule,
    MatCardModule,
    MatDialogModule,
  ],
})
export class ContentModule {}
