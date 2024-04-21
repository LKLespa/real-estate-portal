import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  IconButton,
  Image,
  Stack,
  Text,
  WrapItem
} from "@chakra-ui/react";
import React from "react";
import { gibberish } from "../assets";
import { MdFavorite } from "react-icons/md";
import { BiBookmark, BiMessageSquare } from "react-icons/bi";

export default function PropertyCard({ property }) {
  property = property[0];
  return (
    <WrapItem>
      <Card maxW='xs' size='sm' variant='filled'>
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
          <Text noOfLines={2} textOverflow='ellipsis'>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolore
            saepe quos fugit similique modi autem numquam, sed maxime blanditiis
            ex.
          </Text>
          {/* <Flex maxHeight="500px" justify='center' align={'center'}>
            {displayImages([])}
          </Flex> */}
        </CardBody>
        <Image src={gibberish} objectFit="cover" alt={property.title} />
        <CardFooter justify="space-between" flexWrap="wrap">
          <IconButton isRound variant='ghost' colorScheme='red'><MdFavorite size={25}/></IconButton>
          <IconButton isRound variant='ghost'>
            <BiBookmark size={25}/>
          </IconButton>
          <IconButton isRound variant='ghost'>
            <BiMessageSquare size={25}/>
          </IconButton>
        </CardFooter>
      </Card>
    </WrapItem>
  );
}

const displayImages = (images) => {
  let numberOfPhotos = Math.floor(Math.random() * 6) + 1;
  numberOfPhotos = 1;
  images = [
    gibberish,
    gibberish,
    gibberish,
    gibberish,
    gibberish,
    gibberish,
    gibberish,
  ];
  console.log("Images", numberOfPhotos);

  switch (numberOfPhotos) {
    case 1:
      return OneImageList(images);
    case 2:
      return TwoImageList(images);
    case 3:
      return ThreeImageList(images);
    case 4:
      return FourImageList(images);
    case 5:
      return FiveImageList(images);
    default:
      return SixImageList(images);
  }
};

const OneImageList = (image) => (
  <Box width="300px" height="250px" flexGrow={1}>
    <MyImage bgImage={image[0]} width="100%" />
  </Box>
);

const TwoImageList = (images) => (
  <Stack
    spacing={1}
    direction={["column", null, "row"]}
    height="400px"
    width="100%"
  >
    <MyImage bgImage={images[0]} flexGrow={4} />
    <MyImage bgImage={images[1]} flexGrow={2} />
  </Stack>
);

const ThreeImageList = (images) => (
  <Stack direction={["column", null, "row"]} height="100%">
    <MyImage bgImage={images[0]} flexGrow={3} />
    <Stack direction={["row", null, "column"]}>
      <MyImage bgImage={images[1]} flexGrow={1} />
      <MyImage bgImage={images[2]} flexGrow={1} />
    </Stack>
  </Stack>
);

const FourImageList = (images) => (
  <Stack>
    <Stack flex={3}>
      <MyImage bgImage={images[0]} flexGrow={3} />
      <MyImage bgImage={images[1]} flexGrow={2} />
    </Stack>
    <Stack flex={2}>
      <MyImage bgImage={images[2]} flexGrow={1} />
      <MyImage bgImage={images[3]} flexGrow={1} />
    </Stack>
  </Stack>
);

const FiveImageList = (images) => (
  <Stack>
    <Stack flex={3}>
      <MyImage bgImage={images[0]} flexGrow={3} />
      <Stack>
        <MyImage bgImage={images[1]} flexGrow={1} />
        <MyImage bgImage={images[2]} flexGrow={1} />
      </Stack>
    </Stack>
    <Stack flex={2}>
      <MyImage bgImage={images[3]} flexGrow={1} />
      <MyImage bgImage={images[4]} flexGrow={1} />
    </Stack>
  </Stack>
);

const SixImageList = (images) => (
  <Stack>
    <Stack flex={3}>
      <MyImage bgImage={images[0]} flexGrow={3} />
      <Stack>
        <MyImage bgImage={images[1]} flexGrow={1} />
        <MyImage bgImage={images[2]} flexGrow={1} />
      </Stack>
    </Stack>
    <Stack flex={2}>
      <MyImage bgImage={images[3]} flexGrow={1} />
      <MyImage bgImage={images[4]} flexGrow={1} />
      <MyImage bgImage={images[5]} flexGrow={1} />
    </Stack>
  </Stack>
);

const MyImage = (props) => {
  return (
    <Box
      {...props}
      height="100%"
      width="100%"
      bgSize="cover"
      bgPosition={"center"}
      borderRadius={20}
    ></Box>
  );
};
