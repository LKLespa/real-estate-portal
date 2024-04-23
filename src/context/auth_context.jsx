import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import "firebase/auth";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  getAuth,
} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc, collection, setDoc } from "firebase/firestore";
import { SiDblp } from "react-icons/si";
import { useToast } from "@chakra-ui/react";

// Create a context for authentication
export const AuthContext = createContext();

// Create a provider component for authentication
export const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  // Wrap in use effect
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        await getUserData();
      } else {
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, [auth]);

  const getUserData = useCallback(
    async () => {
    if (getAuth().currentUser) {
      const id = getAuth().currentUser.uid;
      const userDocRef = doc(collection(db, "users"), id);
      try {
        const docSnapshot = await getDoc(userDocRef);
        setUserData({ id, ...docSnapshot.data() });
      } catch (error) {
        toast({
          title: "Connection Problem",
          description: "Check your internet connection",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  }, []);

  // Function to sign out from Firebase
  const signOut = () => {
    const logOut = async () => {
      await firebaseSignOut(auth).catch((error) => {
        setError(error.message);
        setUserData(null);
        throw error;
      });
    };

    toast.promise(logOut(), {
      success: { title: "Logout Successful" },
      error: { title: "Logout Failed", error },
      loading: { title: "Logging out...", description: "Please wait" },
    });
  };

  const signIn = (email, password) => {
    const login = async () => {
      try {
        const { user } = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            setError("Invalid email address");
            throw new Error("Invalid email address");
          case "auth/user-not-found":
            setError("User not found");
            throw new Error("User not found");
          case "auth/wrong-password":
            setError("Wrong password");
            throw new Error("Wrong password");
          case "auth/network-request-failed":
            setError("Network request failed");
            throw new Error("Network request failed");
          default:
            throw error;
        }
      } finally {
      }

      window.location.pathname = "/";
    };

    toast.promise(login(), {
      success: { title: "Login Successful" },
      error: { title: "Login Failed", description: error },
      loading: { title: "Logging in...", description: "Please wait" },
    });
  };

  const signUp = (email, password, fullName, phoneNumber) => {
    const register = async () => {
      try {
        const { user } = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        const userRef = doc(collection(db, "users"), user.uid);
        await setDoc(userRef, { id: user.uid, email, fullName, phoneNumber });
        setUserData({ id: user.uid, email, fullName, phoneNumber });
        window.location.pathname = "/";
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setError("Email already in use");
            throw new Error("Email already in use");
          case "auth/invalid-email":
            setError("Invalid email address");
            throw new Error("Invalid email address");
          case "auth/weak-password":
            setError("Password should be at least 6 characters");
            throw new Error("Password should be at least 6 characters");
          default:
            throw error;
        }
      } finally {
      }
    };

    toast.promise(register(), {
      success: { title: "Registration successful" },
      error: { title: "Registration unsuccessful", description: error },
      loading: { title: "Registering...", description: "Please wait..." },
    });
  };

  // Provide the current user and authentication functions to the children components
  return (
    <AuthContext.Provider
      value={{ userData, signIn, signUp, signOut, getUserData, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
