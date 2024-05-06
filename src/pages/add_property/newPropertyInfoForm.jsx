import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  HStack,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Select,
  Textarea,
  VStack,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { countryData } from "../../temp/country_data";
import { useState } from "react";
import { installmentFrequencies } from "../../temp/property_variants";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const NewPropertyInfoForm = ({ property, stepper, setProperty }) => {
  const [cities, setCities] = useState([]);
  const handleRegionChange = (e) => {
    let region = e.target.value;
    setProperty((prev) => ({ ...prev, region }));
    console.log("city", region);
    let state = countryData.states.find((state) => state.name === region);
    if (state != undefined) {
      setCities(state.cities);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().trim().required("Name is required"),
    noOfRooms:
      property.typeOftype === "building"
        ? Yup.number()
            .required("Number of rooms is required")
            .min(1, "Number of rooms must be at least 1")
        : Yup.number(),
    area:
      property.typeOftype === "land"
        ? Yup.number()
            .required("Area is required")
            .min(1, "Area must be at least 1 m²")
        : Yup.number(),
    region: Yup.string().trim().required("Region is required"),
    city: Yup.string().trim().required("City is required"),
    address: Yup.string().trim(),
    latitude: Yup.number()
      .min(-90, "Latitude must be between -90 and 90")
      .max(90, "Latitude must be between -90 and 90"),
    longitude: Yup.number()
      .min(-180, "Longitude must be between -180 and 180")
      .max(180, "Longitude must be between -180 and 180"),
    price: Yup.number().required("Price is required"),
    installment:
      property.status === "Rent"
        ? Yup.string().trim().required("Installment is required")
        : Yup.string().trim(),
    additionalInfo: Yup.string().trim(),
  });

  const initialValues = {
    name: property.type,
    noOfRooms: "",
    area: "",
    region: "",
    city: "",
    address: "",
    latitude: "",
    longitude: "",
    price: "",
    installment: "",
    additionalInfo: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      console.log("Form submitted with values:", values);
      setProperty(prev => ({...prev, ...values}));
      stepper.goToNext()
      setSubmitting(false);
    }, 400);
  }

  return (
    <VStack width='100%'>
      <HStack paddingBottom={5}>
        <IconButton
          variant="ghost"
          isRound
          onClick={() => stepper.goToPrevious()}
        >
          <ArrowBackIcon fontSize={30} />
        </IconButton>
        <Heading size="lg">Information about the property</Heading>
      </HStack>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form style={{ width: "100%" }}>
            <Flex
              direction={["column", null, null, "row"]}
              justifyContent={["flex-start", null, null, "space-around"]}
            >
              <VStack>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <InputGroup>
                        <InputLeftAddon>Name</InputLeftAddon>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          {...field}
                          variant="outline"
                          placeholder="Enter name"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                {property.typeOftype === "building" && (
                  <Field name="noOfRooms">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.noOfRooms && form.touched.noOfRooms
                        }
                      >
                        <InputGroup>
                          <InputLeftAddon>No of Rooms</InputLeftAddon>
                          <Input
                            type="number"
                            id="noOfRooms"
                            name="noOfRooms"
                            {...field}
                            variant="outline"
                            placeholder="Enter number of rooms"
                          />
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.noOfRooms}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
                {property.typeOftype === "land" && (
                  <Field name="area">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.area && form.touched.area}
                      >
                        <InputGroup>
                          <InputLeftAddon>Area</InputLeftAddon>
                          <Input
                            type="number"
                            id="area"
                            name="area"
                            {...field}
                            variant="outline"
                            placeholder="Enter area"
                          />
                          <InputRightAddon>m<sup>2</sup></InputRightAddon>
                        </InputGroup>
                        <FormErrorMessage>{form.errors.area}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
                <Heading size="sm" paddingTop={2} alignSelf="flex-start">
                  Location
                </Heading>
                <Field name="region">
  {({ field, form }) => (
    <FormControl
      isInvalid={form.errors.region && form.touched.region}
    >
      <InputGroup>
        <InputLeftAddon>Region</InputLeftAddon>
        <Select
          id="region"
          name="region"
          {...field}
          variant="outline"
          placeholder="Select region"
          onChange={(e) => {
            // Set the value of the region field manually
            form.setFieldValue("region", e.target.value);
            // Call your handleRegionChange function if needed
            handleRegionChange(e);
          }}
        >
          {countryData.states.map((region, index) => (
            <option key={index} value={region.name}>
              {region.name}
            </option>
          ))}
        </Select>
      </InputGroup>
      <FormErrorMessage>{form.errors.region}</FormErrorMessage>
    </FormControl>
  )}
</Field>

                <Field name="city">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.city && form.touched.city}
                    >
                      <InputGroup>
                        <InputLeftAddon>City</InputLeftAddon>
                        <Select
                          id="city"
                          name="city"
                          {...field}
                          variant="outline"
                          placeholder="Select city"
                        >
                          {cities.map((city, index) => (
                            <option key={index} value={city.name}>
                              {city.name}
                            </option>
                          ))}
                        </Select>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.city}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="address">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.address && form.touched.address}
                    >
                      <InputGroup>
                        <InputLeftAddon>Address</InputLeftAddon>
                        <Input
                          type="address"
                          id="address"
                          {...field}
                          name="address"
                          variant="outline"
                          placeholder="Enter address"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.address}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Heading size="sm" paddingTop={2} alignSelf="flex-start">
                  Map coordinates (optional)
                </Heading>
                <Field name="latitude">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.latitude && form.touched.latitude}
                    >
                      <InputGroup>
                        <InputLeftAddon>Latitude</InputLeftAddon>
                        <Input
                          type="number"
                          id="latitude"
                          {...field}
                          name="latitude"
                          variant="outline"
                          placeholder="Enter latitude"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.latitude}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="longitude">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.longitude && form.touched.longitude
                      }
                    >
                      <InputGroup>
                        <InputLeftAddon>Longitude</InputLeftAddon>
                        <Input
                          type="number"
                          id="longitude"
                          {...field}
                          name="longitude"
                          variant="outline"
                          placeholder="Enter longitude"
                        />
                      </InputGroup>
                      <FormErrorMessage>
                        {form.errors.longitude}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </VStack>
              <VStack>
                <Heading size="sm" paddingTop={2} alignSelf="flex-start">
                  Payment
                </Heading>
                {property.status === "Rent" && (
                  <Field name="installment">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.installment && form.touched.installment
                        }
                      >
                        <InputGroup>
                          <InputLeftAddon>Installment</InputLeftAddon>
                          <Select
                            id="installment"
                            name="installment"
                            {...field}
                            variant="outline"
                            placeholder="Select installment"
                          >
                            {installmentFrequencies.map(
                              (installment, index) => (
                                <option key={index} value={installment.name}>
                                  {installment.name}
                                </option>
                              )
                            )}
                          </Select>
                        </InputGroup>
                        <FormErrorMessage>
                          {form.errors.installment}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                )}
                <Field name="price">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.price && form.touched.price}
                    >
                      <InputGroup>
                        <InputLeftAddon>Price</InputLeftAddon>
                        <Input
                          type="number"
                          id="price"
                          name="price"
                          {...field}
                          variant="outline"
                          placeholder="Enter amount per installment"
                        />
                        <InputRightAddon>FCFA</InputRightAddon>
                      </InputGroup>
                      <FormErrorMessage>{form.errors.price}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="additionalInfo">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.additionalInfo &&
                        form.touched.additionalInfo
                      }
                    >
                      <Textarea
                        id="additionalInfo"
                        name="additionalInfo"
                        {...field}
                        variant="outline"
                        placeholder="Additional Information"
                      />
                      <FormErrorMessage>
                        {form.errors.additionalInfo}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button type="submit" width="100%" isLoading={isSubmitting}>
                  Next
                </Button>
              </VStack>
            </Flex>
          </Form>
        )}
      </Formik>
    </VStack>
  );
};

export default NewPropertyInfoForm;
