import { Box, Button, Center, Divider, Flex, FormControl, FormLabel, HStack, Heading, IconButton, Image, Input, Text, VStack, useBoolean, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { gibberish } from "../../assets";
import { PiPlayCircle } from "react-icons/pi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { collection, doc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";
import { useAuth } from "../../context/auth_context";
import { ref } from "firebase/storage";

const NewPropertyMediaFrom = ({property, stepper, setProperty}) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const toast = useToast();
  const [submitting, setSubmitting] = useBoolean(false);
  const userID = auth.currentUser.uid;

  const uploadPhoto = async (file, id, index) => {
    const name = file.name.slice(10)
    let newPhotoUrls = [...photoUrls];
    newPhotoUrls[index] = `${id}/${name}`;
    setPhotoUrls(newPhotoUrls);
    const storageRef = ref(storage, `properties/${photoUrls[index]}`);
  }

  const uploadVideo = async (file, id) => {
    const name = file.name.slice(10)
    setVideoUrl(`${id}/${name}`);
    const storageRef = ref(storage, `properties/${videoUrl}`);
  }


  const handlePhotoChange = (e) => {
    const files = e.target.files;
    const urls = [];
    // Iterate through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        // Check if the file size is less than or equal to 2MB
        if (file.size <= 2 * 1024 * 1024) {
          const url = URL.createObjectURL(file);
          urls.push(url);
        } else {
            toast({
              title: `File ${file.name} exceeds the maximum size of 2MB.`,
              status: "error",
              duration: 5000,
              isClosable: true,
            });
        }
      } else {
        toast({
          title: `File ${file.name} is not an image.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
        console.error(`File ${file.name} is not an image.`);
      }
    }
    // Update the photoUrls state with the new URLs
    setPhotoUrls((prevUrls) => [...prevUrls, ...urls.slice(0, 6 - prevUrls.length)]);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    // Check if the file is a video
    if (file.type.startsWith("video/")) {
      // Check if the file size is less than or equal to 50MB
      if (file.size <= 10 * 1024 * 1024) {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
      } else {
        toast({
          title: `File ${file.name} exceeds the maximum size of 50MB.`,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: `File ${file.name} is not a video.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      console.error(`File ${file.name} is not a video.`);
    }
  };

  const handleSubmit = () => {
        if(photoUrls.length === 0) {
            toast({
                title: "Please add at least one photo",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
            return;
        }
        setProperty(prev => ({...prev, photos: photoUrls, video: videoUrl}));
        const upload = () => {
            try {
                setSubmitting.on();
                const docRef = doc(collection(db, "properties"))
                console.log('Doc ref', docRef.id)

                const data = {
                    ownerID: userID,
                    ...property,
                    photos: photoUrls,
                    video: videoUrl
                }
            } catch (error) {
                console.log(error);
                throw new Error("An Error occured while uploading");
            } finally {
                setSubmitting.off();
            }
        }

        upload()
  }

  return (
    <VStack spacing={3}>
      <HStack>
      <IconButton
          variant="ghost"
          isRound
          onClick={() => stepper.goToPrevious()}
        >
          <ArrowBackIcon fontSize={30} />
        </IconButton>
      <Heading size="lg">Upload media for the property</Heading>
      </HStack>
      <Flex direction="column">
        <Flex flexWrap='wrap' justify="center" width="100%" padding={2}>
          {[1,2,3,4,5,6].map((photoUrl, index) => (
            <Box boxShadow="md" m={1} key={index} flexShrink={0}>
              <Image src={photoUrls[index] === undefined ? gibberish : photoUrls[index] } alt={`Photo ${index + 1}`} objectFit="cover" height={200} width="100%" />
            </Box>  
          ))}
        </Flex>
        <FormControl>
          <Center>
          <FormLabel htmlFor="photos">
            <Button as="label" htmlFor="photos" cursor="pointer" variant='outline'>
              Select up to 6 Photos
            </Button>
            <Text align='center'>{photoUrls.length} selected</Text>
            <Input id="photos" type="file" accept="image/*" multiple style={{ display: "none" }} onChange={handlePhotoChange} />
          </FormLabel>
          </Center>
          <Center>
            <Button onClick={() => setPhotoUrls([])} variant='outline'>Clear Photos</Button>
          </Center>
        </FormControl>
      </Flex>
      <Divider />
      <Flex direction='column' width='100%' marginTop={10}>
        <Center>
        <Box width={"100%"} maxWidth={600} minHeight={300} bgColor='gray'>
            {videoUrl === '' && <Center height='100%'>
                <PiPlayCircle fontSize={50} />
            </Center>}
            {videoUrl !== '' && <video src={videoUrl} controls width={"100%"} height={"100%"}/>}
        </Box>
        </Center>
        <Center>
        <FormLabel htmlFor="video">
            <Button as="label" htmlFor="video" cursor="pointer" variant='outline' marginTop={2}>
              Select a video
            </Button>
            <Input id="video" type="file" accept="video/*" style={{ display: "none" }} onChange={handleVideoChange} display='none'/>
          </FormLabel>
        </Center>
      </Flex>

      <Button onClick={() => handleSubmit()} isLoading={submitting} loadingText={'Uploading...'}>Upload</Button>
    </VStack>
  );
};

export default NewPropertyMediaFrom;
