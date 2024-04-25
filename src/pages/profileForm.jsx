import {
  Button,
  Input,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Tr,
  useBoolean,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../context/auth_context";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { countryData } from "../temp/country_data";

const ProfileForm = ({ userData }) => {
  const [edit, setEdit] = useBoolean();
  const [submitting, setSubmitting] = useBoolean();
  const { getUserData } = useAuth();
  const toast = useToast();
  const [data, setData] = useState({
    Fullname: userData.fullName,
    Email: userData.email,
    Phone: userData.phoneNumber,
    Address: userData.address,
    City: userData.city,
    Region: userData.region,
  });

  const [cities, setCities] = useState(() => {
    return countryData.states.find(state => state.name === data.Region).cities;
  })

  useEffect(() => {
    let state = countryData.states.find(state => state.name === data.Region)
    if(state != undefined) {
      setCities(state.cities)
    }
  }, [data.Region])

  const handleChange = (e) => {
    setData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

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

      const isEmpty = (text) => text.length === 0;

      if (isEmpty(fullName) || isEmpty(phone)) {
        throw new Error("Name and Phone are required");
      }

      const data = {
        fullName: fullName,
        email: email,
        phoneNumber: phone,
        address: address,
        city: city,
        region: region,
      }
      console.log('Submit', )

      await setDoc(doc(db, "users", userData.id), data)
        .then(() => {
          getUserData();
        })
        .catch((error) => {
          console.log('Error', error)
          throw new Error(error.message);
        })
        .finally(() => {
          setSubmitting.off();
          setEdit.off();
        });
    };

    toast.promise(submission(event), {
      success: { title: "Update Successfull" },
      error: { title: "Update Failed" },
      loading: { title: "Updating...", description: "Please wait" },
    });
  };

  const handleChangeState = (e) => {
    handleChange(e);
    console.log('selected is', e.target.value)
    setData(prev => ({ ...prev, City: ''}))
  }

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
            {/* <Tr>
              <Th>Country</Th>
              <Td>
                <Select
                  placeholder="Select Country"
                  id="Country"
                  isReadOnly={!edit}
                  onChange={handleChange}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                  defaultValue={data.Country}
                >
                  <option value="cameroon">Cameroon</option>
                  <option value="ghana">Ghana</option>
                  <option value="usa">USA</option>
                </Select>
              </Td>
            </Tr> */}
            <Tr>
              <Th>State/Region</Th>
              <Td>
                <Select
                  placeholder="Select Region"
                  id="Region"
                  isReadOnly={!edit}
                  onChange={handleChangeState}
                  variant={edit ? "filled" : "unstyled"}
                  paddingLeft={2}
                  defaultValue={data.Region}
                >
                  {countryData.states.map(state => <option value={state.name} key={state.state_code}>{state.name}</option>)}
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
                  {cities.map(city => <option value={city.name} key={city.name}>{city.name}</option>)}
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
                  <Button
                    width="100%"
                    onClick={(e) => {
                      e.preventDefault();
                      setEdit.on();
                    }}
                  >
                    Edit
                  </Button>
                )}
              </Td>
            </Tr>
          </Tfoot>
        </Table>
      </TableContainer>
    </form>
  );
};

export default ProfileForm;
