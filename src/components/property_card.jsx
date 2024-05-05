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
  WrapItem
} from "@chakra-ui/react";
import React from "react";
import { gibberish } from "../assets";
import { FaHome, FaLocationArrow } from "react-icons/fa";
import { GrLocation } from "react-icons/gr";
import { useNavigate } from "react-router";

export default function PropertyCard({ property }) {
  const navigate = useNavigate()
  property = property[0];
  return (
    <WrapItem>
      <Card width='xs' size={["xs", "sm"]} variant='filled' _hover={{
        boxShadow: "dark-lg",
        cursor: "pointer",
      }} onClick={() => navigate(`/property/${property.id}`)}>
        <CardHeader>
          <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
            <Avatar
              name={property.postedBy.name}
              bgImage={property.postedBy.photo}
            />
            <Box>
              <Heading size="sm">{property.postedBy.name}</Heading>
              <Text>Posted on: {property.datePosted}</Text>
            </Box>
          </Flex>
        </CardHeader>
        <CardBody>
          <Flex justify='space-between'>
          <HStack spacing={1} alignItems='center'>
            <FaHome size='20px'/>
            <Heading size='md'>{property.type}</Heading>
          </HStack>
          <Text fontWeight='bold'>{property.noRooms} {property.noRooms > 0 ? 'Rooms' : 'Room'}</Text>
          </Flex>
          <HStack>
              <GrLocation />
              <Text fontSize='sm' fontWeight='semibold' color='gray.700'>{property.city} {property.cameroon}, {property.address}</Text>
            </HStack>
          <Text fontWeight='semibold'>{property.price} per {property.installment}</Text>
        </CardBody>
        <Box height='fit-content' position='relative'>
        <Badge variant='solid' position='absolute' top={2} left={2}>{property.status}</Badge>
        <Image src={gibberish} objectFit="cover" alt={property.title} height={200} width='100%'/>
        <Box position='absolute' bottom={0} left={0} p={1} bgColor='rgba(0, 0, 0, 0.5)'>
        <Text noOfLines={2} lineHeight={1.2} textOverflow='ellipsis' color='white'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            saepe quos fugit similique modi autem numquam, sed maxime blanditiis
            ex.
          </Text>
        </Box>
        </Box>
      </Card>
    </WrapItem>
  );
}