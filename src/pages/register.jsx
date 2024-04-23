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
import React, { useContext, useState, useEffect } from "react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Outlet, Link as ReactRouterLink } from "react-router-dom";
import { useAuth } from "../context/auth_context";

export default function RegisterPage() {
  const authenticate = useAuth();
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
          <Heading as="h5" size="md"></Heading>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().trim().required("Full Name is required"),
          phoneNumber: Yup.string().trim().required("Phone Number is required"),
          email: Yup.string()
            .trim()
            .email("Invalid email address")
            .required("Email is required"),
          password: Yup.string().trim().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout( async () => {
            // alert(JSON.stringify(values, null, 2));
            authenticate.signUp(values.email, values.password, values.fullName, values.phoneNumber);
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form style={{ width: "100%" }}>
          <VStack>
            <Field name="fullName">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.fullName && form.touched.fullName}
                >
                  <FormLabel htmlFor="fullName">Full Name</FormLabel>
                  <Input
                    {...field}
                    id="fullName"
                    placeholder="Enter your full name"
                    variant="filled"
                  />
                  <FormErrorMessage>{form.errors.fullName}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="phoneNumber">
              {({ field, form }) => (
                <FormControl
                  mt={4}
                  isInvalid={
                    form.errors.phoneNumber && form.touched.phoneNumber
                  }
                >
                  <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
                  <Input
                    {...field}
                    id="phoneNumber"
                    placeholder="Enter your phone number"
                    variant="filled"
                  />
                  <FormErrorMessage>{form.errors.phoneNumber}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel htmlFor="email">Email Address</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      id="email"
                      placeholder="Enter your email"
                      variant="filled"
                    />
                    <InputRightElement pointerEvents="none">
                      <EmailIcon color="gray.500" />
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="password">
              {({ field, form }) => (
                <FormControl
                  mt={4}
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel htmlFor="password">Password</FormLabel>
                  <InputGroup>
                    <Input
                      {...field}
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      variant="filled"
                    />
                    <InputRightElement pointerEvents="click">
                      <IconButton
                        variant="link"
                        onClick={() => setShowPassword.toggle()}
                      >
                        {showPassword ? (
                          <ViewOffIcon color="gray.icon" />
                        ) : (
                          <ViewIcon color="gray.500" />
                        )}
                      </IconButton>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
          </VStack>

          <Center>
            <Button mt={4} width="200px" colorScheme="teal" type="submit" disabled={authenticate.loading}>
              Register
            </Button>
          </Center>
        </Form>
      </Formik>
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