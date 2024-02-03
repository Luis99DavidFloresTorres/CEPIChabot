import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MainNavComponent } from './main-nav/main-nav.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlujosComponent } from './content/flujos/flujos.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatGridListModule} from '@angular/material/grid-list';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { FlujoServicio } from './content/flujos/flujoService.component';
import { HttpClient, HttpClientModule, HttpHandler } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { userGuardGuard } from './user-guard.guard';
import { FormIAComponent } from './form-ia/form-ia.component';
import { FormularioTablaRecomendarComponent } from './recomendarNuevoCurso/formulario-tabla-recomendar/formulario-tabla-recomendar.component';

@NgModule({
  declarations: [
    AppComponent,
    MainNavComponent,
    FlujosComponent,
    LoginComponent,
    FormIAComponent,
    FormularioTablaRecomendarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FlexLayoutModule,
    MatGridListModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 
  ],
  providers: [FlujoServicio, HttpClient ],
  bootstrap: [AppComponent]
})
export class AppModule { }
