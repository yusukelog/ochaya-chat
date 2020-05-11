import firebase from 'firebase'

// .env に設定した値を取得してる
const firebaseConfig = {
  apiKey: 'AIzaSyBlg_Xx_CRI62cCnhYnuSSbR2qDQ3UL1MU',
  authDomain: 'chaya-chat.firebaseapp.com',
  databaseURL: 'https://chaya-chat.firebaseio.com',
  projectId: 'chaya-chat',
  storageBucket: 'chaya-chat.appspot.com',
  messagingSenderId: '752746984144',
  appId: '1:752746984144:web:373b430e4e0f6a092224d5',
  measurementId: 'G-YXC0MNCVT6'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()

export default firebase
