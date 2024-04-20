import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Button,
  FormErrorMessage,
  VStack,
  Box,
  Center,
  Heading,
  InputGroup,
  Select,
  InputRightElement,
  IconButton,
  Link as ChakraLink,
  useBoolean,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Text,
  PinInput,
  Flex,
  Spacer,
  Stack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useBoolean();

  return (
    <Container
      maxW="container.lg"
      bg="gray.50"
      centerContent
      h="100vh"
      overflow="auto"
    >
      <Box bg="white" p={10} maxW="600px">
        <VStack spacing={4}>
          <Heading color="teal.800">Real Estate Portal</Heading>
          <Outlet />
          <ChakraLink
            as={ReactRouterLink}
            color="teal"
            to="/login"
            mt={4}
          >
            Already have an account?
          </ChakraLink>
        </VStack>
      </Box>
    </Container>
  );
}

export function RegisterUserAs() {
  return (
    <VStack pt={5} spacing={3}>
        <Heading as="h5" size="md">
            Register
          </Heading>
      <Button variant="ghost" colorScheme="teal">
        <ChakraLink as={ReactRouterLink} to="/register/client">
          <Heading size="md">Continue As A Client</Heading>
          <Text>Looking for properties to buy or rent?</Text>
        </ChakraLink>
      </Button>
      <Heading size="sm">Or</Heading>
      <Button variant="ghost" colorScheme="teal">
        <ChakraLink as={ReactRouterLink} to="/register/owner">
          <Heading size="md">Continue As An Owner</Heading>
          <Text>And start selling or renting out your properties</Text>
        </ChakraLink>
      </Button>
    </VStack>
  );
}

export function RegisterOwner() {
  return <div>Register Owner</div>;
}
