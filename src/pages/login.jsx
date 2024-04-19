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
  InputRightElement,
  IconButton,
  Link as ChakraLink,
  useBoolean,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Link as ReactRouterLink } from "react-router-dom";

export default function LoginPage() {
    const [ showPassword, setShowPassword ] = useBoolean();
    const handleShowPassword = () => {
        setShowPassword.toggle();
    }

  return (
    <Container maxW="container.md" bg="gray.50" h="100vh">
      <Center h='100%'>
        <Box bg='white' p={10}>
          <VStack>
            <Heading color='teal.800'>Real Estate Portal</Heading>
            <Heading as='h5' size='md'>Login</Heading>
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("Invalid email address")
                  .required("Email is required"),
                password: Yup.string().required("Password is required"),
              })}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                }, 400);
              }}
            >
              <Form>
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
                        variant='filled'
                      />
                      <InputRightElement pointerEvents='none'>
                        <EmailIcon color='gray.500'/>
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
                        variant='filled'
                      />
                      <InputRightElement pointerEvents='click'>
                        <IconButton variant='link' onClick={() => handleShowPassword()}>
                            {showPassword ? <ViewOffIcon color='gray.icon'/> : <ViewIcon color='gray.500'/>}
                        </IconButton>
                      </InputRightElement>
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.password}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <ChakraLink as={ReactRouterLink} color='teal' to='/forgot-password' mt={4}>Forgot Password?</ChakraLink>
                <Button mt={4} type="submit" w='100%'>
                  Login
                </Button>
              </Form>
            </Formik>
            <ChakraLink as={ReactRouterLink} color='teal' to='/register'>Don't have an account?</ChakraLink>
          </VStack>
        </Box>
      </Center>
    </Container>
  );
}
