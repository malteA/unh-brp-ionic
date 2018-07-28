import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DirectionForecastComponent } from "./direction-forecast/direction-forecast.component";

export const components = [
  DirectionForecastComponent
]
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule.forRoot()
  ],
  declarations: [components],
  entryComponents: [],
  exports: [components]
})
export class ComponentsModule {}
