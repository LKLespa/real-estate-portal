import {
  Avatar, Container, Tab,
  TabList,
  TabPanel,
  TabPanels, Tabs, Text, VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiHome, BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../../context/auth_context";
import ProfileForm from "./profileForm";
import { AddIcon } from "@chakra-ui/icons";
import NewProperty from "../add_property/newProperty";

export default function ProfilePage() {
  const { userData, loading } = useAuth()
  const tempData = {
    fullName: 'Elkay Lespa',
    email: 'elkaylespa@gmail.com',
    phoneNumber: '679-682-262',
    address: '123 Main St',
    city: 'Centre',
    region: 'Akono',
  }

  if(loading) {
    return (<div>loading...</div>)
  }

  // if(!userData) {
  //   return (<div>No user data</div>)
  // }

  return (
    <Container maxW="container.xl" height="100vh" bgColor="white">
      <Tabs>
        <TabList>
          <Tab>
            <CgProfile />
            <Text>My Profile</Text>
          </Tab>
          <Tab>
            <BiHome />
            <Text>My Properties</Text>
          </Tab>
          <Tab>
            <AddIcon />
            <Text>Add Property</Text>
          </Tab>
          <Tab>
            <BiMessage />
            <Text>Messages</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              <Avatar size="2xl" name="Mbah Lesky" />
              <ProfileForm userData={userData !== undefined ? userData : tempData} />
            </VStack>
          </TabPanel>
          <TabPanel>
            
          </TabPanel>
          <TabPanel>
            <NewProperty />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
