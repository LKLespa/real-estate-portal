import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Spacer,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { gibberish } from "../assets";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../firebaseConfig";

export default function PropertyCard({ property }) {
  const [imageUrl, setImageUrl] = useState(gibberish);
  const fullDateUploaded = property.dateUploaded.toDate()
  const amOrPm = fullDateUploaded.getHours() > 12 ? "PM" : "AM"
  const dateUploaded = `${fullDateUploaded.toString().slice(4, 15)} - ${fullDateUploaded.toString().slice(16, 21)} ${amOrPm}`

  getDownloadURL(ref(storage, property.photos[0])).then((url) => {
    setImageUrl(url);
  }).catch((error) => {
    console.log("Image url error", error)
  })
  console.log("Date Uploaded", dateUploaded, imageUrl);
  const navigate = useNavigate();
  return (
    <WrapItem>
      <Card
        width="xs"
        size="sm"
        variant="filled"
        _hover={{
          boxShadow: "dark-lg",
          cursor: "pointer",
        }}
        onClick={() => navigate(`/property/${property.id}`)}
      >
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar name={property.ownerName ?? "Mbah Lesky"} bgImage={""} />
            <Box>
              <Heading size="sm">{property.ownerName ?? "Mbah Lesky"}</Heading>
              <Text size="xs">
                {dateUploaded}
              </Text>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex justify="space-between">
            <HStack spacing={1} alignItems="center">
              <FaHome size="20px" />
              <Heading size="md">{property.type}</Heading>
            </HStack>
            {property.typeOftype === "building" ? (
              <Text fontWeight="bold">
                {property.noOfRooms} {property.noOfRooms > 0 ? "Rooms" : "Room"}
              </Text>
            ) : (
              <Text fontWeight="bold">
                {property.area} sq m
              </Text>
            )}
          </Flex>
          <HStack>
            <GrLocation />
            <Text fontSize="sm" fontWeight="semibold" color="gray.700">
              {property.city} {property.cameroon}, {property.address}
            </Text>
          </HStack>
          {property.status === 'Rent' ? <Text fontWeight="semibold">
            {property.price} {property.installment}
          </Text> : <Text fontWeight="semibold">
            {property.price}
          </Text>}
        </CardBody>
        <Box height="fit-content" position="relative">
          <Badge variant="solid" position="absolute" top={2} left={2}>
            For {property.status}
          </Badge>
          <Image
            src={imageUrl}
            objectFit="cover"
            alt={property.title}
            height={200}
            width="100%"
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            p={1}
            bgColor="rgba(0, 0, 0, 0.5)"
          >
            <Text
              noOfLines={2}
              lineHeight={1.2}
              textOverflow="ellipsis"
              color="white"
            >
              {property.additionalInfo}
            </Text>
          </Box>
        </Box>
      </Card>
    </WrapItem>
  );
}
