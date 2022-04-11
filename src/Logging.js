import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';
import { collection, addDoc } from 'firebase/firestore';
import configData from './config.json';

const firebaseConfig = {
    apiKey: configData.apiKey,
    authDomain: configData.authDomain,
    projectId: configData.projectId,
    storageBucket: configData.storageBucket,
    messagingSenderId: configData.measurementId,
    appId: configData.appId,
    measurementId: configData.measurementId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const logCollection = collection(db, 'loggin');


const Logging = async (username) => {
    await addDoc(logCollection, {
        company_name: configData.COMPANY_NAME,
        username: username,
        access_on: new Date()
    }).catch(ex => console.log('firebase exception', ex));
}

export default Logging;