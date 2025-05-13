import {
  Avatar,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  HStack,
  Heading,
  IconButton,
  Image,
  Text,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { FaHome, FaHeart } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getDownloadURL, ref } from "firebase/storage";
import { auth, db, storage } from "../firebaseConfig";
import { gibberish } from "../assets";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../context/auth_context";

export default function PropertyCard({ property }) {
  const [imageUrl, setImageUrl] = useState(gibberish);
  const [isHovered, setIsHovered] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const { userData, loading } = useAuth()
  const userId = userData?.id;
  const likes = userData?.likes ?? [];

  const isLiked = likes.includes(property.id)

  const fullDateUploaded = property.dateUploaded.toDate();
  const amOrPm = fullDateUploaded.getHours() > 12 ? "PM" : "AM";

  const dateUploaded = `${fullDateUploaded.toDateString()} - ${fullDateUploaded
    .toTimeString()
    .slice(0, 5)} ${amOrPm}`;

  useEffect(() => {
    getDownloadURL(ref(storage, property.photos[0]))
      .then((url) => setImageUrl(url))
      .catch(() => {});
  }, [property.photos]);

  const handleToggleFavorite = async (e) => {

    e.stopPropagation();
    if(!userId){
      toast({
        title: "Please Create Account or Sign In to continue",
        status: "warning",
        duration: 2000,
        isClosable: true,
      });

      return;
    }
    
    try {
      if (isLiked) {
        await removeFromFavorites(userId, property.id);
        toast({ title: "Removed from favorites", status: "info", duration: 2000 });
      } else {
        await addToFavorites(userId, property.id);
        toast({ title: "Added to favorites", status: "success", duration: 2000 });
      }
    } catch (err) {
      toast({ title: "Error updating favorites", status: "error", duration: 2000 });
    }
  };

  console.log("User Data is", userData)

  const addToFavorites = async (userId, propertyId) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      likes: arrayUnion(propertyId),
    });
    console.log("Property added to favorites ✅");
  } catch (error) {
    console.error("Error adding to favorites ❌", error);
  }
}

  const removeFromFavorites = async (userId, propertyId) => {
  const userRef = doc(db, "users", userId);

  try {
    await updateDoc(userRef, {
      likes: arrayRemove(propertyId),
    });
    console.log("Property removed from favorites ❌");
  } catch (error) {
    console.error("Error removing from favorites ❌", error);
  }
}

  return (
    <Card
      maxW='300px'
      h="450px"
      borderRadius="lg"
      overflow="hidden"
      bg="white"
      boxShadow="md"
      _hover={{ boxShadow: "lg" }}
      transition="all 0.2s ease"
      onClick={() => navigate(`/property/${property.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      cursor="pointer"
      display="flex"
      flexDirection="column"
    >
      {/* Image & Overlay Section */}
      <Box position="relative" h="60%" overflow="hidden">
        <Image
          src={imageUrl}
          alt={property.title}
          objectFit="cover"
          w="100%"
          h="100%"
        />
        {/* Badge & Heart */}
        <Badge position="absolute" top={3} left={3} px={3} borderRadius="full">
          For {property.status}
        </Badge>
        {/* Hover Overlay */}
        {isHovered && (
          <Box
            position="absolute"
            bottom={0}
            w="100%"
            bg="rgba(0, 0, 0, 0.5)"
            color="white"
            p={3}
            fontSize="xs"
            transition="0.3s"
          >
            <Flex alignItems="center" gap={2}>
              <Avatar size="xs" name={property.ownerName ?? "Agent"} />
              <Box>
                <Text fontWeight="bold">{property.ownerName ?? "Agent"}</Text>
                <Text>{dateUploaded}</Text>
              </Box>
            </Flex>
            <HStack mt={2}>
              <GrLocation />
              <Text isTruncated>
                {property.city}, {property.address}
              </Text>
            </HStack>
          </Box>
        )}
      </Box>

      {/* Info Section */}
      <Box p={3} flex="1">
        <Stack spacing={2}>
          <HStack spacing={2}>
            <FaHome />
            <Heading size="sm">{property.type}</Heading>
          </HStack>
          <Text fontSize="sm" color="gray.600">
            {property.typeOftype === "building"
              ? `${property.noOfRooms} ${property.noOfRooms > 1 ? "Rooms" : "Room"}`
              : `${property.area} sq m`}
          </Text>
          <Text fontWeight="bold" color="purple.600">
            {property.status === "Rent"
              ? `${property.price} / ${property.installment}`
              : `${property.price}`}
          </Text>
          <Text fontSize="xs" color="gray.600" noOfLines={2}>
            {property.additionalInfo}
          </Text>
        </Stack>
      </Box>

      {/* Footer Actions */}
      <HStack p={3} pt={0}>
        <Button
          size="sm"
          variant="outline"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/property/${property.id}`);
          }}
          w="full"
        >
          View Details
        </Button>
        <IconButton
          icon={<FaHeart size={isLiked ? '25px' : '18px'} />}
          variant="ghost"
          colorScheme={isLiked ? "red" : "gray"}
          aria-label="Save"
          onClick={handleToggleFavorite}
        />
      </HStack>
    </Card>
  );
}
