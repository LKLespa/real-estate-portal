import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  List,
  ListItem,
  Menu,
  MenuGroup,
  MenuItem,
  MenuList,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Link, NavLink } from "react-router-dom";

import Sidebar from "./sidebar";
import { LuBookMarked } from "react-icons/lu";
import { BiMessage, BiSave } from "react-icons/bi";
import { useAuth } from "../context/auth_context";
import { auth } from "../firebaseConfig";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function NavigationWrapper() {
  const { userData, signOut, getUserData } = useAuth();
  const [ loading, setLoading ] = useState(true);
  const navigate = useNavigate();
  const [ authObj, setAuthObj ] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false);
        getUserData();
      } else  {
      setLoading(false);
    }});
    return () => unsubscribe();
  }, []);

  if(loading) {
    return (<div>Loading...</div>)
  }
  if (!auth.currentUser){
    return <div>Failed...</div>
  } 
  
  return (
    <Container maxW="100vw" bg="gray.100" h="100vh">
      <VStack spacing={2} height="100%">
        <Box bg="white" width="100%" px={3} py={4}>
          <HStack justify="space-between" align="center" spacing={2}>
            <Heading size={["md", "lg"]} color="teal.600">
              Real Estate Portal
            </Heading>
            <InputGroup maxW="500px" flexShrink={1}>
              <InputLeftElement>
                <IconButton variant="ghost">
                  <SearchIcon />
                </IconButton>
              </InputLeftElement>
              <Input placeholder="Search" ml="auto" boxShadow="base" />
            </InputGroup>
            <HStack spacing={2}>
              <Button leftIcon={<BiSave />} isRound>
                Saved
              </Button>

              <IconButton isRound>
                <BiMessage />
              </IconButton>
              <IconButton variant="unstyled" onClick={() => signOut()}>
                <Avatar src="" height={"40px"} width={"40px"} />
              </IconButton>
            </HStack>
          </HStack>
        </Box>
        <HStack
          className="content"
          width="100%"
          align="stretch"
          overflowY="hidden"
        >
          <Sidebar />
          <Box flexGrow={1} bg="white" p={3}>
            <Outlet />
          </Box>
        </HStack>
      </VStack>
    </Container>
  ) 
}
