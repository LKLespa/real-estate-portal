import { Box, VStack, Wrap, HStack, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import { auth } from "../../firebaseConfig";
import PropertyCard from "../../components/property_card";
import { usePropertiesContext } from "../../context/properties_context";

export default function UserProperties() {
  const { properties, fetching, error, errorMsg } = usePropertiesContext();
  const userID = auth.currentUser?.uid; 
  const userProperties = properties.filter(properties => properties.ownerID === userID);
  console.log('Properties', properties)

  return (
    <HStack className="content" width="100%" align="stretch" overflowY="hidden">
      <Box flexGrow={1} bg="white" p={3}>
        <VStack height="100%" overflowY="auto">
          <Wrap spacing="20px" justify="space-around">
            {userProperties.map((property) => (
              <PropertyCard property={property} />
            ))}
          </Wrap>
        </VStack>
      </Box>
    </HStack>
  );
}
