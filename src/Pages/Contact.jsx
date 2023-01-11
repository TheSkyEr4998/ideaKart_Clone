import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  contantFormPending,
  contantFormReject,
  contantFormSuccess,
  navbarInputPart,
} from "../Redux/action";

export default function Contact() {
  // status part
  const {
    contactFormStatusPending,
    contactFormStatusReject,
    contactFormStatusSuccess,
    navbarInputPartValue,
  } = useSelector((state) => state);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  // form data stored in object

  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
  });

  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  const userSignUpDataResSend = () => {
    dispatch(contantFormPending());
    axios
      .post(
        "https://jsonserver-twny.onrender.com/ideakartContact",
        inputBoxValue
      )
      .then(() => {
        dispatch(contantFormSuccess());
        return;
      })
      .catch(() => {
        dispatch(contantFormReject());
      });
  };

  //  Return part

  return (
    <div style={contactUsPageBackground}>
      <Typography
        variant="div"
        noWrap
        component="div"
        style={outerBoxForForm}
        sx={{ width: { xs: "75%", sm: "35%" }, overflow: "hidden" }}
      >
        <p
          style={{
            margin: "10px 0",
            color: "black",
            padding: "5px",
            width: "100%",
            whiteSpace: "pre-wrap",
            overflowWrap: "break-word",
          }}
        >
          {" "}
          You can contact our team by filling this form -
        </p>

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
            onChange={handleOnChangeInputBoxValue}
            name="email"
            value={inputBoxValue.email}
            id="standard-adornment-email"
          />
        </FormControl>
        <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
          <InputLabel htmlFor="standard-adornment-number">Number</InputLabel>
          <Input
            onChange={handleOnChangeInputBoxValue}
            name="mobile"
            value={inputBoxValue.mobile}
            id="standard-adornment-number"
          />
        </FormControl>
        <TextareaAutosize
          maxRows={10}
          style={{
            width: "94%",
            margin: "10px auto",
            background: "none",
            outline: "none",
            fontSize: "16px",
            border: "none",
            borderBottom: "1px solid grey",
            color: "black",
            minHeight: "75px",
          }}
          placeholder="Message"
          onChange={handleOnChangeInputBoxValue}
          name="message"
          value={inputBoxValue.message}
          id="standard-adornment-message"
        />

        <Stack
          direction="row"
          spacing={1}
          style={{ margin: "auto", fontWeight: "bold" }}
        >
          <Button
            onClick={() => {
              userSignUpDataResSend();
            }}
          >
            Send Message
          </Button>
        </Stack>

        <Box
          style={{
            textAlign: "center",
            margin: "10px auto",
            color: "grey",
            width: "100%",
          }}
        >
          {contactFormStatusPending ? (
            <CircularProgress />
          ) : contactFormStatusReject ? (
            <p
              style={{
                margin: "10px 0",
                color: "black",
                padding: "5px",
                width: "100%",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                fontWeight: "600",
              }}
            >
              Something went wrong, Please try again
            </p>
          ) : contactFormStatusSuccess ? (
            <p
              style={{
                margin: "10px 0",
                color: "black",
                padding: "5px",
                width: "100%",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                fontWeight: "600",
              }}
            >
              Thank you for contacting, We will resolve your query as soon as
              possible
            </p>
          ) : (
            ""
          )}
        </Box>
      </Typography>
    </div>
  );
}

// form part style
const outerBoxForForm = {
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  margin: "50px auto",
  padding: "20px",
  textAlign: "center",
  fontFamily: "play",
  background: "#ffffffd1",
  color: "black",
};
const contactUsPageBackground = {
  backgroundImage:
    "url('https://images.unsplash.com/photo-1498230870289-7561110a6e69?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')",
  height: "100vh",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
};
