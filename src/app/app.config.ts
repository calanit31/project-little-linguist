import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'little-linguist-bb9f6',
        appId: '1:564171774646:web:b5a8cdae7b3bcb3270e417',
        storageBucket: 'little-linguist-bb9f6.appspot.com',
        apiKey: 'AIzaSyDsTuOkFtuM0pHXL2rhJxlGKragoEqvJNs',
        authDomain: 'little-linguist-bb9f6.firebaseapp.com',
        messagingSenderId: '564171774646',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
