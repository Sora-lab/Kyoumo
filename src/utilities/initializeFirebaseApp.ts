import React from 'react'
import * as firebase from 'firebase/app';


export class InitializeFireBaseApp {

  firebaseConfig = {
    apiKey: "AIzaSyDK_O9itKDbzUCP0cXNmUea3PdPCLgoDWE",
    authDomain: "basic-a6bf2.firebaseapp.com",
    databaseURL: "https://basic-a6bf2.firebaseio.com",
    projectId: "basic-a6bf2",
    storageBucket: "basic-a6bf2.appspot.com",
    messagingSenderId: "837296415722",
    appId: "1:837296415722:web:9a54d959d12c4b64ce8893",
    measurementId: "G-YL475WFGYJ"
  };


  // Initialize Firebase
  initializeApp() {
    firebase.initializeApp(this.firebaseConfig);
  }
}