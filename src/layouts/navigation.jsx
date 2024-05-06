import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
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
  Spinner,
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
  const { userData, signOut, getUserData, loading } = useAuth();
  const navigate = useNavigate();

  console.log('Auth', auth)

  if(loading) {
    return (
    <Box height='100vh' width='100vw'>
      <Center height='100%' width='100%'><Spinner /></Center>
    </Box>
    )
  }
  if (!auth.currentUser){
   return <Navigate to='/login' replace />
  } 
  
  return (
    <Container maxW="100vw" bg="gray.100" h="100vh">
      <VStack spacing={2} height="100%">
        <Box bg="white" width="100%" px={3} py={4}>
          <HStack justify="space-between" align="center" spacing={2}>
            <Link to="/">
            <Heading flexShrink={0} size={["md", "lg"]} color="teal.600" display={["none", null, "block"]}>
              Real Estate Portal
            </Heading>
            </Link>
            <Link to="/">
            <Heading onClick={() => navigate('/')} size={["md", "lg"]} color="teal.600" display={["block", null, "none"]}>
              REP
            </Heading>
            </Link>
            <InputGroup maxW="500px" flexShrink={1}>
              <InputLeftElement>
                <IconButton variant="ghost">
                  <SearchIcon />
                </IconButton>
              </InputLeftElement>
              <Input placeholder="Search" ml="auto" boxShadow="base" />
            </InputGroup>
            <HStack spacing={2}>
              <Button display={["none", null, "block"]} leftIcon={<BiSave />} isRound>
                Saved
              </Button>
              <Box display={["none", "block"]}>
              <IconButton isRound >
                <BiMessage />
              </IconButton>
              </Box>
              <IconButton variant="unstyled" onClick={() => navigate('/profile')}>
                <Avatar src="" height={"40px"} width={"40px"} />
              </IconButton>
            </HStack>
          </HStack>
        </Box>
        <Outlet />
      </VStack>
    </Container>
  ) 
}
