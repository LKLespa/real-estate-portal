import { Box, VStack, Wrap, HStack, Center, Spinner } from "@chakra-ui/react";
import React from "react";
import PropertyCard from "../components/property_card";
import Sidebar from "../layouts/sidebar";
import { usePropertiesContext } from "../context/properties_context";

export default function HomePage() {
  const { properties, fetching, error, errorMsg } = usePropertiesContext();
  console.log('Properties', properties)

  return (
    <HStack className="content" width="100%" align="stretch" overflowY="hidden">
      <Box display={["none", null, "block"]}>
        <Sidebar />
      </Box>
      <Box flexGrow={1} bg="white" p={3}>
        <VStack height="100%" overflowY="auto">
          <Wrap spacing="20px" justify="space-around">
            {properties.map((property) => (
              <PropertyCard property={property} />
            ))}
          </Wrap>
        </VStack>
      </Box>
    </HStack>
  );
}
