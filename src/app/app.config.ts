import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebase = {
  apiKey: "",
  authDomain: "todolistpooja.firebaseapp.com",
  projectId: "todolistpooja",
  storageBucket: "todolistpooja.firebasestorage.app",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(),
    importProvidersFrom(
      provideFirebaseApp(() => initializeApp(firebase)),
      provideFirestore(() => getFirestore())
    )
  ]
};
