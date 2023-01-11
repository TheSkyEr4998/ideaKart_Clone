import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart, dataAddItemUpdateOurNot } from "../Redux/action";
import axios from "axios";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import Button from "@mui/material/Button";
function Profile() {
  const [userDataProfile, setUserDataProfile] = React.useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    id: 1,
    data: [],
  });

  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: "",
    email: "",
    address: "",
    pincode: "",
  });

  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  const [userProfileEdit, setUserProfileEdit] = React.useState(false);
  const { navbarInputPartValue, addItemUpdateOurNot } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);
  React.useEffect(() => {
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartUser/${localStorage.getItem(
          "userLogId"
        )}`
      )
      .then((res) => setUserDataProfile(res.data));
  }, [addItemUpdateOurNot]);

  const updateUserProfile = () => {
    setUserProfileEdit(false);
    axios
      .patch(
        `https://jsonserver-twny.onrender.com/ideakartUser/${localStorage.getItem(
          "userLogId"
        )}`,
        inputBoxValue
      )
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={outerBoxForForm}
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "1fr 1fr",
        },
        overflow: "hidden",
      }}
    >
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <PersonPinIcon style={{ width: "150px", height: "150px" }} />
        {userProfileEdit ? (
          <Box
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-name">Name</InputLabel>
              <Input
                onChange={handleOnChangeInputBoxValue}
                name="name"
                value={inputBoxValue.name}
                id="standard-adornment-name"
                type="text"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
              <Input
                name="email"
                onChange={handleOnChangeInputBoxValue}
                value={inputBoxValue.email}
                id="standard-adornment-email"
              />
            </FormControl>

            <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-address">
                Address
              </InputLabel>
              <Input
                onChange={handleOnChangeInputBoxValue}
                value={inputBoxValue.address}
                name="address"
                id="standard-adornment-address"
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
              <InputLabel htmlFor="standard-adornment-pincode">
                Pincode / Zipcode
              </InputLabel>
              <Input
                name="pincode"
                onChange={handleOnChangeInputBoxValue}
                value={inputBoxValue.pincode}
                id="standard-adornment-pincode"
              />
            </FormControl>
            <Button onClick={updateUserProfile}>Update Profile</Button>
          </Box>
        ) : (
          <Box
            style={{
              textAlign: "start",
              width: "95%",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
              color: "black",
            }}
          >
            <InputLabel>Name: {userDataProfile.name}</InputLabel>
            <InputLabel>Email: {userDataProfile.email}</InputLabel>
            <InputLabel>Number: {userDataProfile.mobile}</InputLabel>
            <InputLabel>Address: {userDataProfile.address || ""}</InputLabel>
            <InputLabel>Pincode: {userDataProfile.pincode || ""}</InputLabel>

            <Button
              onClick={() => {
                setUserProfileEdit(true);
              }}
            >
              {" "}
              Edit Profile
            </Button>
          </Box>
        )}
      </Box>
      {/* part 2 */}
      <Box>
        <h1 style={{ textAlign: "start" }}>Your Last Order</h1>
        {userDataProfile.data.map((element) => (
          <Box
            style={{
              display: "flex",
              height: "150px",
              width: "100%",
              margin: "10px 0",
              alignItems: "center",
              justifyContent: "space-between",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              paddingRight: "10px",
              borderRadius: "0 10px 10px 0",
              textAlign: "start",
            }}
          >
            <Box
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={element.product_img_url}
                alt=""
                style={{ width: "100px", height: "150px" }}
              />
              <Box
                style={{
                  padding: "0 10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <h3
                  style={{
                    whiteSpace: "pre-wrap",
                    overflowWrap: "break-word",
                    margin: "3px 0",
                  }}
                >
                  {element.product_name.slice(0, 40)}...
                </h3>
                <p>
                  &#8377; {element.product_price} X{" "}
                  {element.product_cart_quantity} = &#8377;{" "}
                  {element.product_price * element.product_cart_quantity} /-
                </p>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Typography>
  );
}

export default Profile;

const outerBoxForForm = {
  display: "grid",
  textAlign: "center",
  fontFamily: "play",
  gap: "10px",
  width: "95%",
  margin: "20px auto",
};
