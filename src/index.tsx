
import React from 'react';
import ReactDom from 'react-dom';
import firebase from 'firebase';
import App from './components/App';

const firebaseConfig = {
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
firebase.initializeApp(firebaseConfig);

ReactDom.render(<App/>, document.getElementById('root'));
