import React, { createContext, useContext, useEffect, useState } from "react";
import { collection, doc, getDocs, onSnapshot, orderBy, query, startAfter, limit } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useToast } from "@chakra-ui/react";
import { FaLastfmSquare } from "react-icons/fa";
import { useCategories } from "./category_context";


const searchableFields = [
  "additionalInfo",
  "address",
  "area",
  "city",
  "name",
  "ownerName",
  "region",
  "status",
  "type"
];

const PropertiesContext = createContext();

export const usePropertiesContext = () => useContext(PropertiesContext)

// Todo: implement pagination (fetch more data on scroll and add to the list). Fetch 12 at a time
export const PropertiesProvider = ({ children }) => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [fetching, setFetching] = useState(FaLastfmSquare);
  const [lastVisible, setLastVisible] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const [error, setError] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [searchQuery, setSearchQuery] = useState('');

  const { selectedCategories } = useCategories();

  const fetchLimit = 12;
  const toast = useToast()
  const toastId = "fetch-toast"

 useEffect(() => {
  const fetchProperties = async () => {
    setFetching(true);
    try {
      const propertiesQuery = query(
        collection(db, "properties"),
        orderBy("dateUploaded", "desc"),
        limit(fetchLimit)
      );
      const propertiesSnapshot = await getDocs(propertiesQuery);
      const propertiesData = propertiesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      let filtered = propertiesData;

      // 🔍 1. Filter by search query
      if (searchQuery.trim() !== "") {
        filtered = filtered.filter((property) =>
          Object.entries(property).some(
            ([key, value]) =>
              (typeof value === "string" || typeof value === "number") &&
              value.toString().toLowerCase().includes(searchQuery.toLowerCase())
          )
        );
      }

      console.log('Selection', selectedCategories)
      // 🏷️ 2. Filter by selected categories
 // 🏷️ 2. Filter by selected categories
if (selectedCategories.length > 0) {
  const selectedNames = selectedCategories.map((cat) => cat.name.toLowerCase());

  filtered = filtered.filter((property) => {
    const propertyFieldsToMatch = [
      property.type,
      property.status,
    ].map(val => val?.toString().toLowerCase());

    const matchesBasicFields = selectedNames.some(name =>
      propertyFieldsToMatch.includes(name)
    );

    const size = parseFloat(property.area);
    const price = parseFloat(property.price);

    // 🧱 Size Filtering
    const matchesSize = selectedCategories.some(({ name }) => {
      if (name === "Less than 1000 sq m") return size < 1000;
      if (name === "1000 - 5000 sq m") return size >= 1000 && size <= 5000;
      if (name === "5000 - 15000 sq m") return size >= 1500 && size <= 15000; // This one seems off, might be a typo
      if (name === "15000 + sq m") return size > 15000;
      return false;
    });

    // 💰 Price Filtering
    const matchesPrice = selectedCategories.some(({ name }) => {
      if (name === "Less than 10,000 FCFA") return price < 10000;
      if (name === "10,000 FCFA - 25,000 FCFA") return price >= 10000 && price <= 25000;
      if (name === "25,000 FCFA - 50,000 FCFA") return price > 25000 && price <= 50000;
      if (name === "50,000 FCFA - 100,000 FCFA") return price > 50000 && price <= 100000;
      if (name === "100,000 FCFA - 250,000 FCFA") return price > 100000 && price <= 250000;
      if (name === "250,000 FCFA +") return price > 250000;
      return false;
    });

    return matchesBasicFields || matchesSize || matchesPrice;
  });
}

      setProperties(propertiesData);
      setFilteredProperties(filtered);
      setLastVisible(propertiesSnapshot.docs[propertiesSnapshot.docs.length - 1]);
    } catch (error) {
      setError(error);
      setErrorMsg(error.message);
      if (!toast.isActive(toastId)) {
        toast({
          id: toastId,
          title: "Error fetching properties",
          description: error.message,
          position: "top",
          status: "error",
        });
      }
    } finally {
      setFetching(false);
    }
  };

  fetchProperties();
}, [refresh, searchQuery, selectedCategories]);


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
      if (nextPropertiesData.length === 0) {
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
      if (!toast.isActive(toastId)) {
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
    <PropertiesContext.Provider value={{ properties, filteredProperties, fetching, refreshFetch, error, errorMsg, fetchMore, setSearchQuery }}>
      {children}
    </PropertiesContext.Provider>
  );
};
