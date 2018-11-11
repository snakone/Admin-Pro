// Material Design Modules
import { NgModule } from '@angular/core';

import { MatButtonModule} from '@angular/material';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatTabsModule],

  exports: [MatButtonModule, MatIconModule, MatTabsModule],
})

export class MaterialModule {}
