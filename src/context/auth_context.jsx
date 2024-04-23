import React, { createContext, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut as firebaseSignOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, collection, setDoc } from 'firebase/firestore';
import { SiDblp } from 'react-icons/si';

// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component for authentication
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // Function to sign out from Firebase
  const signOut = () => {
    firebaseSignOut()
     .then(() => {
        setCurrentUser(null);
      })
     .catch(error => {
        console.log(error);
      });
  };

//   // Subscribe to authentication state changes
//   onAuthStateChanged((user) => {
//     setCurrentUser(user);
//   });

  const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
  
      // Fetch the user's document from the user's collection
      const userDocRef = doc(collection(db, 'users'), user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
  
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        setCurrentUser({
          id: user.uid,
          email: userData.email,
          firstName: userData.firstName,
          lastName: userData.lastName,
          telephone: userData.telephone,
        });
      } else {
        console.error('User document not found');
        throw new Error('User document not found');
      }
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

const signUp = async (email, password, fullname, telephone) => {
  try {
    createUserWithEmailAndPassword( auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userDocRef = doc(collection(db, 'users'), user.uid);
      setDoc(userDocRef, {
        id: user.uid,
        email,
        fullname,
        telephone,
      }).then(() => {
        setCurrentUser({id: user.uid, email, fullname, telephone, });
      }).catch((error) => {
        console.error('Error setting user:', error);
      })
    })
    .catch((error) => {
      console.error('Error creating user:', error);
    });
  } catch (error) {
    console.error('Error signing up:', error);
    throw error;
  }
};

  // Provide the current user and authentication functions to the children components
  return (
    <AuthContext.Provider value={{ currentUser, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};