import { SearchIcon } from "@chakra-ui/icons";
import {
  Avatar,
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
import React from "react";
import { Outlet } from "react-router";
import { Link, NavLink } from "react-router-dom";

export default function NavigationWrapper() {
  return (
    <Container maxW="100vw" bg="gray.100" h="100vh">
      <VStack spacing={2} height='100%'>
      <Box className="header" bg="white" width="100%" px={3} py={4}>
        <HStack justify="space-around" align="center" spacing={2}>
          <Heading flexShrink={0} size={["md", "lg"]} color="teal.600">
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
          <IconButton variant="unstyled">
            <Avatar src="" />
          </IconButton>
        </HStack>
      </Box>
      <HStack className="content" width='100%' align='stretch' flexGrow={1}>
      <Box className="sidebar" bg="white" p={3} minWidth="200px" height="100%">
        <VStack width='100%'>
          <List width='100%'>
            <Heading size='sm'>Property Types</Heading>
            <Divider />
            <ListItem as={Button} variant="ghost" width='100%'>
              <NavLink>House</NavLink>
            </ListItem>
            <Divider />
            <ListItem as={Button} variant="ghost" width='100%'>
              <NavLink>Appartment</NavLink>
            </ListItem>
            <Divider />
          </List>
        </VStack>
      </Box>
      <Box flexGrow={1} bg='white' p={3}>
      <Outlet />
      </Box>
     </HStack>
      </VStack>
    </Container>
  );
}
