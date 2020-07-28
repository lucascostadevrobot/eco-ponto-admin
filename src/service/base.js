import firebase from 'firebase';


const config = {
    apiKey: "AIzaSyCYSXI39dPfdx2HICPz8eNmEde3QBGnVzo",
    authDomain: "ecoponto-27359.firebaseapp.com",
    databaseURL: "https://ecoponto-27359.firebaseio.com",
    projectId: "ecoponto-27359",
    storageBucket: "ecoponto-27359.appspot.com",
    messagingSenderId: "216816453741"
}


firebase.initializeApp(config);
export const firebaseDatabase = firebase.database();
export  const firebaseStorage = firebase.storage();

export const auth = firebase.auth();
export const storageKey = 'userAuth';
export const isAuthenticated = () => {
    return !!auth.currentUser || !!localStorage.getItem(storageKey);

}

export default firebase;