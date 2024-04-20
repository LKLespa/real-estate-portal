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
  import { Outlet, Link as ReactRouterLink, useLoaderData, useParams } from "react-router-dom";

export default function RegisterUserForm() {
    const userType = useParams().userType;
    const [showPassword, setShowPassword] = useBoolean();
    return (
      <><Heading as="h5" size="md">
      Register as {userType}
    </Heading>
        <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          gender: "",
          dateOfBirth: "",
          country: "",
          region: "",
          town: "",
          address: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          fullName: Yup.string().trim().required("Full Name is required"),
          phoneNumber: Yup.string().trim().required("Phone Number is required"),
          gender: Yup.string().trim().required("Gender is required"),
          dateOfBirth: Yup.string().trim().required("Date of Birth is required"),
          country: Yup.string().trim().required("Country is required"),
          region: Yup.string().trim().required("Region is required"),
          town: Yup.string().trim().required("Town is required"),
          email: Yup.string()
            .trim()
            .email("Invalid email address")
            .required("Email is required"),
          address: Yup.string().trim().required("Address is required"),
          password: Yup.string().trim().required("Password is required"),
        })}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        <Form style={{ width: "100%" }}>
          <Stack direction={['column', 'row']}>
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
              <Field name="gender">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.gender && form.touched.gender}
                  >
                    <FormLabel htmlFor="gender">Gender</FormLabel>
                    <Select
                      {...field}
                      id="gender"
                      placeholder="Select your gender"
                      variant="filled"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>{form.errors.gender}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="dateOfBirth">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={
                      form.errors.dateOfBirth && form.touched.dateOfBirth
                    }
                  >
                    <FormLabel htmlFor="dateOfBirth">Date of Birth</FormLabel>
                    <Input
                      {...field}
                      id="dateOfBirth"
                      type="date"
                      variant="filled"
                      placeholder="Enter your date of birth"
                    />
                    <FormErrorMessage>{form.errors.dateOfBirth}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="address">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.address && form.touched.address}
                  >
                    <FormLabel htmlFor="address">address</FormLabel>
                    <InputGroup>
                      <Input
                        {...field}
                        type={"text"}
                        id="address"
                        placeholder="Enter your address"
                        variant="filled"
                      />
                      <InputRightElement pointerEvents="none">
                        <PinInput color="gray.500" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
            </VStack>
            <Spacer />
            <VStack>
              <Field name="country">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.country && form.touched.country}
                  >
                    <FormLabel htmlFor="country">Country</FormLabel>
                    <Select
                      {...field}
                      id="country"
                      placeholder="Select your country"
                      variant="filled"
                    >
                      <option value="cameroon">Cameroon</option>
                      <option value="nigeria">Nigeria</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>{form.errors.country}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="region">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.region && form.touched.region}
                  >
                    <FormLabel htmlFor="region">Region</FormLabel>
                    <Select
                      {...field}
                      id="region"
                      placeholder="Select your region"
                      variant="filled"
                    >
                      <option value="north west">North West</option>
                      <option value="south">South</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>{form.errors.region}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="town">
                {({ field, form }) => (
                  <FormControl
                    mt={4}
                    isInvalid={form.errors.town && form.touched.town}
                  >
                    <FormLabel htmlFor="town">Town</FormLabel>
                    <Select
                      {...field}
                      id="town"
                      placeholder="Select your town"
                      variant="filled"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>{form.errors.town}</FormErrorMessage>
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
          </Stack>
  
          <Center><Button mt={4} width='200px' colorScheme="teal" type="submit">
            Register
          </Button></Center>
        </Form>
      </Formik>
      </>
    );
  }