import {
  Avatar, Box, Center, Container, Spinner, Tab,
  TabList,
  TabPanel,
  TabPanels, Tabs, Text, VStack
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiHeart, BiHome, BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/auth_context";
import ProfileForm from "./profileForm";
import { AddIcon } from "@chakra-ui/icons";
import NewProperty from "../add_property/newProperty";
import UserProperties from "./userProperties";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router";
import LikedProperties from "./likeProperties";

export default function ProfilePage() {
  const { userData, loading } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
     if(loading) {
    return (
    <Box height='100vh' width='100vw'>
      <Center height='100%' width='100%'><Spinner /></Center>
    </Box>
    )
  }
  
    if(!auth.currentUser){
    navigate('/login')
  }
  }, [])


  console.log('Auth Exist,', !!auth.currentUser)

  // if(!userData) {
  //   return (<div>No user data</div>)
  // }

  return (
    <Container maxW="container.2xl" height="100vh" bgColor="white">
      <Tabs defaultValue='add'>
        <TabList>
          <Tab value='profile'>
            <CgProfile fontSize='25px' />
            <Text display={["none", null, "block"]}>My Profile</Text>
          </Tab>
          <Tab value='properties'>
            <BiHome fontSize='25px' />
            <Text display={["none", null, "block"]}>My Properties</Text>
          </Tab>
          <Tab value='liked'>
            <BiHeart fontSize='25px' />
            <Text display={["none", null, "block"]}>Saved Properties</Text>
          </Tab>
          <Tab value='add'>
            <AddIcon fontSize='25px' />
            <Text display={["none", null, "block"]}>Add Property</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              <Avatar size="2xl" name="Mbah Lesky" />
              <ProfileForm userData={userData} />
            </VStack>
          </TabPanel>
          <TabPanel>
            <UserProperties />
          </TabPanel>
          <TabPanel>
            <LikedProperties />
          </TabPanel>
          <TabPanel>
            <NewProperty userData={userData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
