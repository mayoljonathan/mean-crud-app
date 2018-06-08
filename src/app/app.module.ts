import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// Angular Material Module
import { MaterialModule } from './material.module';

// Route & Modules
import { AppRoutingModule, appRoutingComponents } from './app-routing.module';
import { ComponentsModule } from './shared/components/components.module';

import { UIHelper } from './shared/helpers/ui.helper';

// Third Party Modules

// Starting Component
import { AppComponent } from './app.component';

// Services/Providers
import { UserService } from './shared/services/';

@NgModule({
  declarations: [
    AppComponent,
    appRoutingComponents
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MaterialModule,
    ComponentsModule,
    AppRoutingModule,
  ],
  providers: [
    UIHelper,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
