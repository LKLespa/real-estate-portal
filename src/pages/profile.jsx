import {
  Avatar,
  Button,
  Container,
  Input,
  Select,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  TableContainer,
  Tabs,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Tr,
  VStack,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { BiHome, BiMessage } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../context/auth_context";
import { AiOutlinesubmitting3Quarters } from "react-icons/ai";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ProfilePage() {
  const { userData, loading } = useAuth()

  if(loading) {
    return (<div>loading...</div>)
  }

  if(!userData) {
    return (<div>No user data</div>)
  }

  return (
    <Container maxW="container.xl" height="100vh" bgColor="white">
      <Tabs>
        <TabList>
          <Tab>
            <CgProfile />
            <Text>My Profile</Text>
          </Tab>
          <Tab>
            <BiHome />
            <Text>My Properties</Text>
          </Tab>
          <Tab>
            <BiMessage />
            <Text>Messages</Text>
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <VStack>
              <Avatar size="2xl" name="Mbah Lesky" />
              <ProfileForm userData={userData} />
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
}

const ProfileForm = ({ userData }) => {
  const [edit, setEdit] = useBoolean();
  const [submitting, setSubmitting] = useBoolean();
  const { getUserData } = useAuth()

  const [ data, setData ] = useState({
    Fullname: userData.fullName,
    Email: userData.email,
    Phone: userData.phoneNumber,
    Address: userData.address,
    City: userData.city,
    Region: userData.region,
    Country: userData.country,
  })

const toast = useToast()

const handleChange = (e) => {
    setData(prev => ({...prev, [e.target.id]: e.target.value}))
}

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting.on();
    const submission = async (event) => {
        let fullName = event.target.Fullname.value.trim();
    let email = event.target.Email.value.trim();
    let phone = event.target.Phone.value.trim();
    let address = event.target.Address.value.trim();
    let city = event.target.City.value.trim();
    let region = event.target.Region.value.trim();
    let country = event.target.Country.value.trim();

    const isEmpty = (text) => text.length === 0;

    if (isEmpty(fullName) || isEmpty(phone)) {
        throw new Error('Name and Phone are required');
    }

    await setDoc(doc(db, 'users', userData.id), {
        fullName: fullName,
        email: email,
        phoneNumber: phone,
        address: address,
        city: city,
        region: region,
        country: country,
    }).then(() => {
        getUserData()
    })
    .catch((error) => {
        throw new Error(error.message)
    })
    .finally(() => {
        setSubmitting.off();
        setEdit.off();
    })
    }
    
    toast.promise(submission(event), {
        success: { title: 'Update Successfull'},
        error: { title: 'Update Failed'},
        loading: { title: 'Updating...', description: 'Please wait' },
    })
    };
  return (
    <form onSubmit={handleSubmit}>
      <TableContainer>
        <Table>
          <Tbody>
            <Tr>
              <Th>Fullname*</Th>
              <Td>
                <Input
                  id="Fullname"
                  value={data.Fullname}
                  placeholder="Enter name"
                  type="text"
                  onChange={handleChange}
                  isReadOnly={!edit}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>Email*</Th>
              <Td>
                <Input
                  id="Email"
                  value={data.Email}
                  placeholder="Enter email"
                  type="email"
                  onChange={handleChange}
                  readOnly
                  disabled={edit}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>Phone*</Th>
              <Td>
                <Input
                  id="Phone"
                  value={data.Phone}
                  placeholder="Enter telephone"
                  type="tel"
                  readOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                />
              </Td>
            </Tr>
            <Tr>
              <Th>Country</Th>
              <Td>
                <Select
                  placeholder="Select Country"
                  id="Country"
                  isReadOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                >
                  <option value="cameroon" defaultValue={data.Country}>Cameroon</option>
                  <option value="ghana">Ghana</option>
                  <option value="usa">
                    USA
                  </option>
                </Select>
              </Td>
            </Tr>
            <Tr>
              <Th>State/Region</Th>
              <Td>
                <Select
                  placeholder="Select Region"
                  id="Region"
                  isReadOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                  defaultValue={data.Region}
                >
                  <option value='north-west'>NorthWest</option>
                </Select>
              </Td>
            </Tr>
            <Tr>
              <Th>City</Th>
              <Td>
                <Select
                  placeholder="Select City"
                  id="City"
                  isReadOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                  defaultValue={data.City}
                >
                  <option value='bamenda'>Bamenda</option>
                  <option>Buea</option>
                </Select>
              </Td>
            </Tr>
            <Tr>
              <Th>Address</Th>
              <Td>
                <Input
                  id="Address"
                  value={data.Address}
                  placeholder="Enter Address"
                  type="address"
                  readOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                />
              </Td>
            </Tr>
          </Tbody>
          <Tfoot>
            <Tr>
              <Td colSpan={2}>
                {edit ? (
                  <Button type="submit" width="100%" disabled={submitting}>
                    Save
                  </Button>
                ) : (
                  <Button width="100%" onClick={(e) => {
                    e.preventDefault()
                    setEdit.on()
                }}>Edit</Button>
                )}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </form>
  );
};
