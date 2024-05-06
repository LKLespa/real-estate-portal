import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useToast } from "@chakra-ui/react";
import { FaLastfmSquare } from "react-icons/fa";


const PropertiesContext = createContext();

export const usePropertiesContext = () => useContext(PropertiesContext)

export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [fetching, setFetching] = useState(FaLastfmSquare);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const toast = useToast()
  const toastId = "fetch-toast"

  useEffect(() => {
    const fetchProperties = async () => {
        setFetching(true);
      try {
        const propertiesQuery = query(collection(db, "properties"), orderBy("dateUploaded", "desc"));
        const propertiesSnapshot = await getDocs(propertiesQuery);
        const propertiesData = propertiesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProperties(propertiesData);
      } catch (error) {
        setError(error);
        setErrorMsg(error.message);
      } finally {
        setFetching(false);
      }
    };


    if(!toast.isActive(toastId)){
      toast.promise(fetchProperties(), {
        error: { id: toastId, title: "Error fetching properties", description: error, position: "top" },
        loading: { id: toastId, title: "Fetching properties...", description: "Please wait", position: "top"  },
        success: { id: toastId, title: "Properties fetched successfully", position: "top"},
      })
    }
    console.log('Refreshed', refresh)
  }, [refresh]);

  const refreshFetch = () => {
    setRefresh(prev => prev + 1)
  }

  return (
    <PropertiesContext.Provider value={{ properties, fetching, refreshFetch, error, errorMsg }}>
      {children}
    </PropertiesContext.Provider>
  );
};