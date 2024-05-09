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
import UserProperties from "./userProperties";

export default function ProfilePage() {
  const { userData, loading } = useAuth()

  if(loading) {
    return (<div>loading...</div>)
  }

  // if(!userData) {
  //   return (<div>No user data</div>)
  // }

  return (
    <Container maxW="container.2xl" height="100vh" bgColor="white">
      <Tabs>
        <TabList>
          <Tab>
            <CgProfile fontSize='25px' />
            <Text display={["none", null, "block"]}>My Profile</Text>
          </Tab>
          <Tab>
            <BiHome fontSize='25px' />
            <Text display={["none", null, "block"]}>My Properties</Text>
          </Tab>
          <Tab>
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
            <NewProperty userData={userData} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}
