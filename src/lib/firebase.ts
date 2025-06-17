import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  collection,
  query,
  where,
  getDocs,
  enableIndexedDbPersistence
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Enable offline persistence
if (typeof window !== 'undefined') {
  enableIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
      console.warn('Multiple tabs open, persistence can only be enabled in one tab at a time.');
    } else if (err.code === 'unimplemented') {
      console.warn('The current browser does not support persistence.');
    }
  });
}

// User data interface
export interface UserData {
  uid: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  lastLogin: Date;
}

// Authentication functions
export const registerUser = async (email: string, password: string, userData: Omit<UserData, 'uid' | 'createdAt' | 'lastLogin'>): Promise<UserCredential> => {
  try {
    console.log('Starting user registration...');
    console.log('Creating user in Firebase Auth...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('User created in Auth:', userCredential.user.uid);
    
    // Store additional user data in Firestore
    const userDoc = {
      uid: userCredential.user.uid,
      ...userData,
      createdAt: new Date(),
      lastLogin: new Date()
    };
    
    console.log('Attempting to store user data in Firestore...');
    console.log('User document data:', userDoc);
    
    try {
      // Use setDoc with merge option to ensure the document is created
      await setDoc(doc(db, 'users', userCredential.user.uid), userDoc, { merge: true });
      console.log('User data successfully stored in Firestore');
    } catch (firestoreError: any) {
      console.error('Firestore error details:', {
        code: firestoreError.code,
        message: firestoreError.message,
        stack: firestoreError.stack
      });
      
      // Если произошла ошибка доступа, попробуем еще раз после небольшой задержки
      if (firestoreError.code === 'permission-denied') {
        console.log('Permission denied, retrying after delay...');
        await new Promise(resolve => setTimeout(resolve, 1000));
        await setDoc(doc(db, 'users', userCredential.user.uid), userDoc, { merge: true });
        console.log('User data successfully stored in Firestore after retry');
      } else {
        throw firestoreError;
      }
    }
    
    return userCredential;
  } catch (error: any) {
    console.error('Registration error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    throw error;
  }
};

export const loginUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    
    // Update last login time
    await setDoc(doc(db, 'users', userCredential.user.uid), {
      lastLogin: new Date()
    }, { merge: true });
    
    return userCredential;
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    return await signOut(auth);
  } catch (error: any) {
    console.error('Logout error:', error);
    throw error;
  }
};

export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

// User data functions
export const getUserData = async (uid: string): Promise<UserData | null> => {
  try {
    const userDoc = await getDoc(doc(db, 'users', uid));
    if (userDoc.exists()) {
      return userDoc.data() as UserData;
    }
    return null;
  } catch (error: any) {
    console.error('Get user data error:', error);
    throw error;
  }
};

export const updateUserData = async (uid: string, data: Partial<UserData>): Promise<void> => {
  try {
    await setDoc(doc(db, 'users', uid), data, { merge: true });
  } catch (error: any) {
    console.error('Update user data error:', error);
    throw error;
  }
};

// Check if email exists
export const checkEmailExists = async (email: string): Promise<boolean> => {
  try {
    console.log('Checking if email exists:', email);
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    console.log('Email check result:', !querySnapshot.empty);
    return !querySnapshot.empty;
  } catch (error: any) {
    console.error('Check email exists error details:', {
      code: error.code,
      message: error.message,
      stack: error.stack
    });
    // Если произошла ошибка доступа, предполагаем что email не существует
    // чтобы позволить процессу регистрации продолжиться
    if (error.code === 'permission-denied') {
      console.log('Permission denied during email check, proceeding with registration');
      return false;
    }
    throw error;
  }
};

export { auth, db }; 