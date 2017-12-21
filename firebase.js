import * as firebase from 'firebase';

import secrets from './myKeys';

const googleSecrets = secrets.google;

const apiKey =  secrets.google.apiKey;
const authDomain = secrets.google.authDomain;
const databaseURL = secrets.google.databaseURL;
const projectId = secrets.google.projectId;
const storageBucket = secrets.google.storageBucket;
const messagingSenderId = secrets.google.messagingSenderId;

const config = {
  apiKey,
  authDomain,
  databaseURL,
  projectId,
  storageBucket,
  messagingSenderId
}

firebase.initializeApp(config);

export default firebase;