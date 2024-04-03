import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { apikeyInterceptor } from '../Interceptors/apikey.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DatePipe } from '@angular/common';
import { SQLite } from '@ionic-native/sqlite/ngx';



export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), provideHttpClient(withInterceptors([apikeyInterceptor])), provideHttpClient(withFetch()), provideAnimationsAsync(),DatePipe,SQLite]
};
