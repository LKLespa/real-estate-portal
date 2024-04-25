import {
  Avatar, Container, Tab,
  TabList,
  TabPanel,
  TabPanels, Tabs, Text, VStack
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BiHome, BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/auth_context";
import ProfileForm from "./profileForm";

export default function ProfilePage() {
  const { userData, loading } = useAuth()

  if(loading) {
    return (<div>loading...</div>)
  }

  if(!userData) {
    return (<div>No user data</div>)
  }

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
            <BiMessage />
            <Text>Messages</Text>
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
            
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
