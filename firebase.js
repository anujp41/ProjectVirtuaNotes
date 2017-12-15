import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyA-YgQ-NJu-1QRg08kpT3soU1D8c2Lb3Us",
  authDomain: "virtuanotes.firebaseapp.com",
  databaseURL: "https://virtuanotes.firebaseio.com",
  projectId: "virtuanotes",
  storageBucket: "virtuanotes.appspot.com",
  messagingSenderId: "806111620814"
}

firebase.initializeApp(config);

export default firebase;