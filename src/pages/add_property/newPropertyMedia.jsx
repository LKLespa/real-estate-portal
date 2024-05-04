import {
  Box,
  Button,
  Center,
  CircularProgress,
  CircularProgressLabel,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { gibberish } from "../../assets";
import { PiPlayCircle } from "react-icons/pi";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { Timestamp, collection, doc, setDoc } from "firebase/firestore";
import { auth, db, storage } from "../../firebaseConfig";
import { useAuth } from "../../context/auth_context";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useNavigate } from "react-router";
import { replace } from "formik";

const NewPropertyMediaFrom = ({ property, stepper, setProperty }) => {
  const [photoUrls, setPhotoUrls] = useState([]);
  const [photoFiles, setPhotoFiles] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [photoProgress, setPhotoProgress] = useState([0, 0, 0, 0, 0, 0]);
  const [videoProgress, setVideoProgress] = useState(0);
  const toast = useToast();
  const [submitting, setSubmitting] = useBoolean(false);
  const userID = auth.currentUser.uid;
  const navigate = useNavigate();
  const docRef = doc(collection(db, "properties"));
  const [filesUploaded, setFilesUploaded] = useState(0);
  const [initialRender, setInitialRender] = useState(true);
  console.log('Property', property)

  useEffect(() => {
    if(!initialRender) {
      if(filesUploaded === getNumberOfFiles()) {
        toast({
          title: "Success",
          description: "Property added successfully",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setTimeout(() => {
          setSubmitting.off();
          navigate("/", replace);
        }, 4000);
    }
    }
   }, [filesUploaded]);

  const getNumberOfFiles = () => {
    return photoFiles.length + (videoFile !== null ? 1 : 0);
  }

  const setImages = (files) => {
    let urls = [];
    for (let i = 0; i < files.length; i++) {
      urls.push(URL.createObjectURL(files[i]));
    }
    setPhotoUrls((prevUrls) => [
      ...prevUrls,
      ...urls.slice(0, 6 - prevUrls.length),
    ]);
    setPhotoFiles((prevFiles) => [
      ...prevFiles,
      ...files.slice(0, 6 - prevFiles.length),
    ]);
    console.log("Files", photoUrls);
  };

  const clearImages = () => {
    setPhotoUrls([]);
    setPhotoFiles([]);
  };

  const clearVideo = () => {
    setVideoUrl("");
    setVideoFile(null);
  };

  const setVideo = (file) => {
    setVideoFile(file);
    setVideoUrl(URL.createObjectURL(file));
  };

  const uploadPhoto = async ({ path, photoFile, index = 0 }) => {
    let progresses = [...photoProgress];
    const upload = async () => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, photoFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            progresses[index] =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPhotoProgress([...progresses]);
            switch (snapshot.state) {
              case "running":
                console.log(
                  `Uploading image ${index + 1} (${photoProgress[index].toFixed(
                    0
                  )}%)...`
                );
                break;
            }
          },
          (error) => {
            setFilesUploaded(prev => prev + 1)
            console.log(`Image ${index + 1}`, error);
            reject(error);
          },
          () => {
            setFilesUploaded(prev => prev + 1)
            console.log(`Image ${index + 1} Successful Uploaded`);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    toast.promise(upload(), {
      success: { title: `Uploaded Image ${index + 1} Successful` },
      error: { title: `Upload Image ${index + 1} Failed` },
      loading: {
        title: `Uploading Image ${index + 1} (${photoProgress[index].toFixed(
          0
        )}%)`,
      },
    });
  };

  const uploadVideo = async ({ path, videoFile }) => {
    const upload = async () => {
      return new Promise((resolve, reject) => {
        const storageRef = ref(storage, path);
        const uploadTask = uploadBytesResumable(storageRef, videoFile);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setVideoProgress(progress);
            switch (snapshot.state) {
              case "running":
                console.log(
                  `Uploading video (${progress.toFixed(
                    0
                  )}%)...`
                );
                break;
            }
          },
          (error) => {
            setFilesUploaded(prev => prev + 1)
            console.log(`Video`, error);
            reject(error);
          },
          () => {
            setFilesUploaded(prev => prev + 1)
            console.log(`Video Successful Uploaded`);
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              resolve(downloadURL);
            });
          }
        );
      });
    };

    toast.promise(upload(), {
      success: { title: `Uploaded Video Successful` },
      error: { title: `Upload Video Failed` },
      loading: {
        title: `Uploading Video (${videoProgress.toFixed(
          0
        )}%)`,
      },
    });
  };


  const handlePhotoChange = (e) => {
    setInitialRender(false);
    const files = e.target.files;
    const images = [];
    // Iterate through selected files
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Check if the file is an image
      if (file.type.startsWith("image/")) {
        // Check if the file size is less than or equal to 2MB
        if (file.size <= 1 * 1024 * 1024) {
          images.push(file);
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
        });
        console.error(`File ${file.name} is not an image.`);
      }
    }
    // Update the photoUrls state with the new URLs
    setImages(images);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    console.log("file", file);
    // Check if the file is a video
    if(file !== undefined) {
    if (file.type.startsWith("video/")) {
      // Check if the file size is less than or equal to 5MB
      if (file.size <= 5 * 1024 * 1024) {
        setVideo(file);
      } else {
        toast({
          title: `File ${file.name} exceeds the maximum size of 5MB.`,
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
}
  const handleSubmit = () => {
    if (photoUrls.length === 0) {
      toast({
        title: "Please add at least one photo",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const uploadPromise = async () => {
      return new Promise((resolve, reject) => {
        setSubmitting.on();
        console.log("Doc ref", docRef.id);

        let photoPaths = [];
        for (let i = 0; i < photoFiles.length; i++) {
          const file = photoFiles[i];
          const name = file.name.slice(10);
          const path = `properties/${userID}/${
            docRef.id
          }/${property.name}-${i}-${name}`;
          photoPaths.push(path);
        }

        let videoPath = "";
        if (videoFile !== undefined && videoFile !== null) {
          const videoName = videoFile.name.slice(10);
          videoPath = `properties/${userID}/${
            docRef.id
          }/${property.name}-${videoName}`;
        }
        const data = {
          ownerID: userID,
          ...property,
          dateUploaded: Timestamp.fromDate(new Date()),
          photos: photoPaths,
          video: videoPath,
        };

        setDoc(docRef, data)
          .then(() => {
            let uploads = [];
            for (let i = 0; i < photoFiles.length; i++) {
              const file = photoFiles[i];
              uploads.push(
                uploadPhoto({ path: photoPaths[i], photoFile: file, index: i })
              );
            }
            if (videoFile !== undefined && videoFile !== null) {
              uploads.push(
                uploadVideo({ path: videoPath, videoFile: videoFile })
              );
            }
            return Promise.all(uploads).then(() => {
              console.log("All uploads resolved");
            });
          })
          .then(() => {
            resolve();
          })
          .catch((error) => {
            console.log("Upload Error", error);
            reject(new Error("An Error occured while uploading"));
          })
          .finally(() => {
            setSubmitting.off();
          });
      });
    };

    uploadPromise();
  };

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
        <Flex flexWrap="wrap" justify="center" width="100%" padding={2}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <Box
              boxShadow="md"
              m={1}
              key={index}
              flexShrink={0}
              display="relative"
            >
              <Image
                src={
                  photoUrls[index] === undefined ? gibberish : photoUrls[index]
                }
                alt={`Photo ${index + 1}`}
                objectFit="cover"
                height={200}
                width="100%"
              />
              {/* {
                photoUploadStatus[index] !== undefined && (
                  <Box display='absolute' bottom={1} left={1}>
                    {photoUploadStatus[index].status === 'uploading' && (
                    <CircularProgress>
                      <CircularProgressLabel>{photoUploadStatus[index].progress}</CircularProgressLabel>
                    </CircularProgress>
                  )}
                  {
                    photoUploadStatus[index].status === 'error' && (
                      <Text color='red'>Error</Text>
                    )
                  }
                  {
                    photoUploadStatus[index].status === 'uploaded' && (
                      <Text color='green'>Uploaded</Text>
                    )
                  }
                  </Box>
                )
              } */}
            </Box>
          ))}
        </Flex>
        <FormControl>
          <Center>
            <FormLabel htmlFor="photos">
              <Button
                as="label"
                htmlFor="photos"
                cursor="pointer"
                variant="outline"
              >
                Select up to 6 Photos
              </Button>
              <Text align="center">{photoUrls.length} selected</Text>
              <Input
                id="photos"
                type="file"
                accept="image/*"
                multiple
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </FormLabel>
          </Center>
          <Center>
            <Button onClick={() => clearImages()} variant="outline">
              Clear Photos
            </Button>
          </Center>
        </FormControl>
      </Flex>
      <Divider />
      <Flex direction="column" width="100%" marginTop={10}>
        <Center>
          <Box
            width={"100%"}
            maxWidth={600}
            minHeight={300}
            bgColor="gray"
            position="relative"
          >
            {videoUrl === "" && (
              <Center height="100%">
                <PiPlayCircle fontSize={50} />
              </Center>
            )}
            {videoUrl !== "" && (
              <video src={videoUrl} controls width={"100%"} height={"100%"} />
            )}
            {/* {
              videoUploadStatus !== undefined && (
                <Box>
                  {
                    videoUploadStatus.status === 'uploading' && (
                      <CircularProgress>
                        <CircularProgressLabel>{videoUploadStatus.progress}</CircularProgressLabel>
                      </CircularProgress>
                    )
                  }
                  {
                    videoUploadStatus.status === 'error' && (
                      <Text color='red'>Error</Text>
                    )
                  }
                  {
                    videoUploadStatus.status === 'uploaded' && (
                      <Text color='green'>Uploaded</Text>
                    )
                  }
                </Box>
              )
            } */}
          </Box>
        </Center>
        <Center>
          <FormLabel htmlFor="video">
            <Button
              as="label"
              htmlFor="video"
              cursor="pointer"
              variant="outline"
              marginTop={2}
            >
              Select a video
            </Button>
            <Input
              id="video"
              type="file"
              accept="video/*"
              style={{ display: "none" }}
              onChange={handleVideoChange}
              display="none"
            />
          </FormLabel>
        </Center>
        <Center>
          <Button
            onClick={() => clearVideo()}
            cursor="pointer"
            variant="outline"
            marginTop={2}
          >
            Clear Video
          </Button>
        </Center>
      </Flex>

      <Button
        onClick={() => handleSubmit()}
        isLoading={submitting}
        loadingText={"Uploading..."}
      >
        Upload
      </Button>
    </VStack>
  );
};

export default NewPropertyMediaFrom;
