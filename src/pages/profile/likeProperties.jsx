import { Box, VStack, Wrap, HStack, Spinner, Text, Center } from "@chakra-ui/react";
import React from "react";
import PropertyCard from "../../components/property_card";
import { usePropertiesContext } from "../../context/properties_context";
import { useAuth } from "../../context/auth_context";

export default function LikedProperties() {
  const { properties, fetching, error, errorMsg } = usePropertiesContext();
  const { userData, loading } = useAuth();

  const likedPropertyIDs = userData?.likes ?? [];

  // Filter liked properties
  const likedProperties = properties.filter((property) =>
    likedPropertyIDs.includes(property.id)
  );

  return (
    <HStack className="content" width="100%" align="stretch" overflowY="hidden">
      <Box flexGrow={1} bg="white" p={3}>
        <VStack height="100%" overflowY="auto" spacing={5}>
          {loading || fetching ? (
            <Center w="100%" py={10}>
              <Spinner size="lg" color="blue.500" />
            </Center>
          ) : likedProperties.length === 0 ? (
            <Center w="100%" py={10}>
              <Text color="gray.500">You haven't liked any properties yet.</Text>
            </Center>
          ) : (
            <Wrap spacing="20px" justify="space-around">
              {likedProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </Wrap>
          )}
        </VStack>
      </Box>
    </HStack>
  );
}
