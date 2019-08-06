import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IpManagerComponent } from './pages/ip-manager/ip-manager.component';

@NgModule({
  declarations: [
    AppComponent,
    IpManagerComponent
    ],
  imports: [
    ReactiveFormsModule,
    FormsModule ,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
