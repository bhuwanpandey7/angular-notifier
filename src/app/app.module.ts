import { AppComponent } from './app.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MapService } from './services/map.service';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NotifierModule, NotifierService, NotifierOptions } from 'angular-notifier';
import { ErrorhandlingService } from './core-services/errorhandling.service';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: 'left',
      distance: 12
    },
    vertical: {
      position: 'bottom',
      distance: 12,
      gap: 10
    }
  },
  theme: 'material',
  behaviour: {
    autoHide: 5000,
    onClick: 'hide',
    onMouseover: 'pauseAutoHide',
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: 'slide',
      speed: 30,
      easing: 'ease'
    },
    hide: {
      preset: 'fade',
      speed: 300000,
      easing: 'ease',
      offset: 50
    },
    shift: {
      speed: 300,
      easing: 'ease'
    },
    overlap: 150
  }
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA3Cr0c6G7FDybQqh4QJQ8mXukeALu9QBI'
    }),
    NotifierModule.withConfig(customNotifierOptions)
  ],
  providers: [MapService, NotifierService, ErrorhandlingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
