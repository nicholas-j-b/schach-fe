import { BasicAuthInterceptor } from './services/authentication/interceptor/BasicAuthInterceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { forwardRef, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { LoginComponent } from './components/forms/login/login.component';
import { CreateAccountComponent } from './components/forms/create-account/create-account.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './components/shared/spinner/spinner.component';
import { PageWrapperComponent } from './components/shared/page-wrapper/page-wrapper.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { PlayPageComponent } from './pages/play-page/play-page.component';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { LobbyPageComponent } from './pages/lobby-page/lobby-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { RegisterComponent } from './components/forms/register/register.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CardComponent } from './components/shared/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    LoginPageComponent,
    LoginComponent,
    CreateAccountComponent,
    SpinnerComponent,
    PageWrapperComponent,
    SidebarComponent,
    PlayPageComponent,
    ProfilePageComponent,
    LobbyPageComponent,
    RegisterPageComponent,
    RegisterComponent,
    CardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useExisting: forwardRef(() => BasicAuthInterceptor), multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
