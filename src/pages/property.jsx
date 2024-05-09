import {
  Box,
  Button,
  ButtonGroup,
  Center,
  Container,
  Flex,
  Grid,
  HStack,
  Heading,
  Image,
  Link,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Text,
  Th,
  Tr,
  VStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLoaderData, useLocation, useParams } from "react-router";
import { db, storage } from "../firebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";
import { gibberish } from "../assets";
import { BiPlay } from "react-icons/bi";
import { FaEnvelope, FaLocationArrow, FaPhone, FaWhatsapp } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";

export default function PropertyPage() {
  const { propertyId } = useParams();
  const [property, setProperty] = useState(null);
  const [fetching, setFetching] = useBoolean(false);
  const [photos, setPhotos] = useState([]);
  const [video, setVideo] = useState("");
  const toast = useToast();
  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setFetching.on();
        const propertyRef = doc(db, "properties", propertyId);
        const propertySnap = await getDoc(propertyRef);
        if (propertySnap.exists()) {
          setProperty(propertySnap.data());
          const photoPromises = propertySnap
            .data()
            .photos.map((photo) => getDownloadURL(ref(storage, photo)));
          const videoPromise = propertySnap.data().video
            ? getDownloadURL(ref(storage, propertySnap.data().video))
            : Promise.resolve("");
          setPhotos(await Promise.all(photoPromises));
          setVideo(await videoPromise);
          const userRef = doc(db, "users", propertySnap.data().ownerID);
          const userSnap = await getDoc(userRef);
          if(userSnap.exists()){
            setProperty((prev) => ({ ...prev, owner: userSnap.data() }));
          } else {
            setProperty((prev) => ({ ...prev, owner: null }));
            throw new Error({ message: "Could not get owner" });
          }
        } else {
          throw new Error({ message: "Property does not exist" });
        }
      } catch (err) {
        console.log(err);
        toast({
          title: "Error fetching property",
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "top",
          description: err?.message,
        });
      } finally {
        setFetching.off();
      }
    };

    fetchProperty();
  }, [propertyId]);

  console.log("Owner", property)

  return (
    <Container maxW="container.2xl" height="100vh" bgColor="white">
      {fetching ? (
        <Center height="100%">
          <Spinner />
        </Center>
      ) : (
        <VStack padding={[2, null, 5]} spacing='30px'>
          <Box width="100%">
            <Tabs align="center">
              <TabPanels bgColor="blackAlpha.500">
                {photos.map((photo, index) => (
                  <TabPanel>
                    <Image
                      src={photo}
                      fallbackSrc={gibberish}
                      // boxSize={['100%', '300px', '400px']}
                      width="100%"
                      height={["300px", null, "400px"]}
                      objectFit="contain"
                    />
                  </TabPanel>
                ))}
                {video !== "" && (
                  <TabPanel>
                    <Box height={["300px", null, "400px"]}>
                      <Center height="inherit">
                        <video
                          src={video}
                          style={{ height: "100%" }}
                          controls
                        />
                      </Center>
                    </Box>
                  </TabPanel>
                )}
              </TabPanels>
              <TabList>
                {photos.map((photo, index) => (
                  <Tab
                    key={index}
                    _selected={{
                      bg: "teal.500",
                      color: "white",
                    }}
                    _hover={{
                      bg: "teal.200",
                      color: "white",
                    }}
                  >
                    <Image
                      src={photo}
                      fallbackSrc={gibberish}
                      boxSize="25px"
                      objectFit="cover"
                    />
                  </Tab>
                ))}
                {video !== "" && (
                  <Tab
                    key={"video"}
                    _selected={{
                      bg: "teal.500",
                      color: "white",
                    }}
                    _hover={{
                      bg: "teal.200",
                      color: "white",
                    }}
                  >
                    <BiPlay />
                  </Tab>
                )}
              </TabList>
            </Tabs>
          </Box>
          {property && (
            <VStack width='100%' spacing='30px' padding={[2, null, 5]} shadow='lg'>
              <Heading size={["md", "lg"]} textAlign='center'>
                {property.name} for {property.status} ({property.type})
              </Heading>
              <Flex direction={['column', null, 'row']} justifyContent='space-evenly' width='100%'>
                <VStack>
                <HStack><FaLocationArrow />
                <Text fontSize={["lg", "xl"]}>
                  {property.address}{" "}
                  {property.address == "" ? "" : ","} {property.city} -{" "}
                  {property.region}
                </Text></HStack>
                <Heading size={["h4", "h5"]}>
                  {property.price} FCFA {property.installment}
                </Heading>
                {property.typeOfType === "building" ? (
                  <Text size={['md', 'lg']}>
                    {property.type} has an area of {property.area} m<sup>2</sup>
                  </Text>
                ) : (
                  <Text size={['md', 'lg']}>
                    {property.type} has {property.noOfRooms}{" "}
                    {property.noRooms == 1 ? "Room" : "Rooms"}
                  </Text>
                )}
                <Text>{property.additionalInfo}</Text>
                </VStack>
                {property.owner && <VStack marginTop={[5, null, 0]}>
                  <Heading size='md'>Contact Owner</Heading>
                  <Heading size='sm'>{property.owner.fullName}</Heading>
                  <ButtonGroup variant='outline' spacing='2'>
                    <Link href={`tel:${property.owner.phoneNumber}`} target='_blank'><Button id='phone' leftIcon={<FaPhone/>}>Call</Button></Link>
                    <Link href={`sms:${property.owner.phoneNumber}`} target='_blank'><Button id='message' leftIcon={<FaMessage />}>Message</Button></Link>
                  </ButtonGroup>
                  <ButtonGroup variant='outline' spacing='2'>
                    <Link href={`mailto:${property.owner.email}`} target='_blank'><Button id='email' leftIcon={<FaEnvelope/>}>Email</Button></Link>
                    <Link href={`https://wa.me/${property.owner.phoneNumber}`} target='_blank'><Button id='whatsapp' leftIcon={<FaWhatsapp />}>Whatsapp</Button></Link>
                  </ButtonGroup>
                </VStack>}
              </Flex>
            </VStack>
          )}
        </VStack>
      )}
    </Container>
  );
}
