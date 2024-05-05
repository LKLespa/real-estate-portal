import {
  Stepper,
  Step,
  useSteps,
  StepIndicator,
  StepStatus,
  Box,
  StepTitle,
  StepDescription,
  StepIcon,
  StepNumber,
  StepSeparator,
  VStack,
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { propertyStatuses, propertyTypes } from "../../temp/property_variants";
import { useEffect, useState } from "react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import NewPropertyInfoForm from "./newPropertyInfoForm";
import NewPropertyMediaFrom from "./newPropertyMedia";
import { useTheme } from "@emotion/react";

const steps = [
  {
    title: "Property Type",
  },
  {
    title: "Sale/Rent",
  },
  {
    title: "Property Info",
  },
  {
    title: "Property Media",
  },
];

const NewProperty = () => {
  const stepper = useSteps({ index: 0, count: steps.length });
  const [property, setProperty] = useState(null);
  useEffect(() => {
    console.log("Property is ", property);
  }, [stepper.activeStep]);
  return (
    <Flex paddingTop={3} direction={["column", null, "row"]}>
      <Stepper
        display={["none", null, "flex"]}
        index={stepper.activeStep}
        orientation="vertical"
        height="300px"
        gap={0}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink={0}>
              <StepTitle>{step.title}</StepTitle>
            </Box>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Stepper
        display={["flex", null, "none"]}
        orientation="horizontal"
        index={stepper.activeStep}
        marginBottom={2}
      >
        {steps.map((step, index) => (
          <Step key={index}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <StepSeparator />
          </Step>
        ))}
      </Stepper>
      <Box flexGrow={1} p={[0, 0, 5]} paddingTop={0}>
        {
          [
            <SelectPropertyType stepper={stepper} setProperty={setProperty} />,
            <SelectPropertyStatus stepper={stepper} setProperty={setProperty} />,
            <NewPropertyInfoForm stepper={stepper} setProperty={setProperty} property={property}/>,
            <NewPropertyMediaFrom stepper={stepper} setProperty={setProperty} property={property}/>,
          ][stepper.activeStep]
        }
      </Box>
    </Flex>
  );
};

export default NewProperty;

export const SelectPropertyType = ({ setProperty, stepper }) => {
  const handleSelect = (type, typeOftype) => {
    setProperty((prev) => ({ ...prev, type, typeOftype }));
    stepper.goToNext();
  };

  return (
    <VStack>
      <Heading size='lg' paddingBottom={5}>Select Property Type</Heading>
      {propertyTypes.map((propertyType, index) => (
        <Button
          variant="outline"
          key={index}
          onClick={() => handleSelect(propertyType.name, propertyType.type)}
          width="100%"
          maxWidth="400px"
        >
          {propertyType.name}
        </Button>
      ))}
    </VStack>
  );
};

export const SelectPropertyStatus = ({ setProperty, stepper }) => {
  const handleSelect = (status) => {
    setProperty((prev) => ({ ...prev, status }));
    stepper.goToNext();
  };

  return (
    <VStack>
      <HStack paddingBottom={5}>
        <IconButton variant='ghost' isRound onClick={() => stepper.goToPrevious()}>
          <ArrowBackIcon fontSize={30}/>
        </IconButton>
      <Heading size='lg'>Sale or rent property?</Heading>
      </HStack>
      {propertyStatuses.filter((propertyStatus) => propertyStatus.available).map((propertyStatus, index) => (
        <Button
          variant="outline"
          key={index}
          onClick={() => handleSelect(propertyStatus.name)}
          width="100%"
          maxWidth="400px"
        >
          {propertyStatus.text}
        </Button>
      ))}
    </VStack>
  );
};
