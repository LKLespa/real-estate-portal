import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, orderBy, query, startAfter, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useToast } from "@chakra-ui/react";
import { FaLastfmSquare } from "react-icons/fa";


const PropertiesContext = createContext();

export const usePropertiesContext = () => useContext(PropertiesContext)

// Todo: implement pagination (fetch more data on scroll and add to the list). Fetch 12 at a time
export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [fetching, setFetching] = useState(FaLastfmSquare);
  const [lastVisible, setLastVisible] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const fetchLimit = 12;
  const toast = useToast()
  const toastId = "fetch-toast"

  useEffect(() => {
    const fetchProperties = async () => {
        setFetching(true);
      try {
        const propertiesQuery = query(collection(db, "properties"), orderBy("dateUploaded", "desc"), limit(fetchLimit));
        const propertiesSnapshot = await getDocs(propertiesQuery);
        const propertiesData = propertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesData);
        setLastVisible(propertiesSnapshot.docs[propertiesSnapshot.docs.length - 1])
      } catch (error) {
        setError(error);
        setErrorMsg(error.message);
        if(!toast.isActive(toastId)) {
          toast({ 
            id: toastId,
            title: "Error fetching properties",
            description: error.message,
            position: 'top',
            status: 'error',
          })
        }
      } finally {
        setFetching(false);
      }
    };

    fetchProperties();
    console.log('Refreshed', refresh)
  }, [refresh]);

  const refreshFetch = () => {
    setRefresh(prev => prev + 1)
  }

  const fetchMore = async () => {
    setFetching(true)
    try {
      const nextPropertyQuery = query(collection(db, "properties"), orderBy("dateUploaded", "desc"), startAfter(lastVisible), limit(limit));
      const nextPropertiesSnapshot = await getDocs(nextPropertyQuery);
        const nextPropertiesData = nextPropertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log('nextPropertiesData', nextPropertiesData)
        if(nextPropertiesData.length === 0) {
          toast({
            id: toastId,
            title: "All properties fetched",
            position: 'top',
            status: 'warning',
            duration: 3000,
            isClosable: true,
          })
          return;
        }
        setProperties(prev => [...prev, ...nextPropertiesData]);
        setLastVisible(nextPropertiesSnapshot.docs[nextPropertiesSnapshot.docs.length - 1])
    } catch (err) {
      setError(error);
        setErrorMsg(error?.message);
        console.log('Error', error)
        if(!toast.isActive(toastId)) {
          toast({ 
            id: toastId,
            title: "Error fetching properties",
            description: error?.message,
            position: 'top',
            status: 'error',
          })
        }
    } finally {
      setFetching(false)
    }
  }

  return (
    <PropertiesContext.Provider value={{ properties, fetching, refreshFetch, error, errorMsg, fetchMore }}>
      {children}
    </PropertiesContext.Provider>
  );
};