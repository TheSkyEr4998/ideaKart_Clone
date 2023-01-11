import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircle from "@mui/icons-material/AccountCircle";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";
import CallTwoToneIcon from "@mui/icons-material/CallTwoTone";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import {
  userRegistrationPending,
  userRegistrationReject,
  userRegistrationSuccess,
  navbarInputPart,
} from "../Redux/action";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  // status part
  const {
    registrationPending,
    registrationReject,
    registrationSuccess,
    navbarInputPartValue,
  } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);
  // for password show and hide button

  const [valuesPasswordViewPart, setvaluesPasswordViewPart] = React.useState({
    showPassword: false,
  });
  const handleClickShowPassword = () => {
    setvaluesPasswordViewPart({
      ...valuesPasswordViewPart,
      showPassword: !valuesPasswordViewPart.showPassword,
    });
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // form part style
  const outerBoxForForm = {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "column",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "play",
    background:
      "linear-gradient(145deg, rgba(2,84,165,0.1) 0%, rgba(2,84,160,0.6551724137931034) 100%)",
  };

  // form data stored in object

  const [inputBoxValue, setInputBoxValue] = React.useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
    data: [],
  });

  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  // add user by post rec

  const userSignUpDataResSend = () => {
    dispatch(userRegistrationPending());
    let emailCheck;
    let mobileCheck;

    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartUser?email=${inputBoxValue.email}`
      )
      .then((res) => (emailCheck = res.data))
      .catch(() => dispatch(userRegistrationReject()));
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartUser?mobile=${inputBoxValue.mobile}`
      )
      .then((res) => (mobileCheck = res.data))
      .catch(() => dispatch(userRegistrationReject()));

    setTimeout(() => {
      stortokenId(emailCheck, mobileCheck);
    }, 2000);
  };

  const stortokenId = (emailCheck, mobileCheck) => {
    let loginFlag = true;
    for (let i = 0; i < emailCheck.length; i++) {
      if (
        emailCheck[i].email === inputBoxValue.email ||
        mobileCheck[i].mobile === inputBoxValue.mobile
      ) {
        loginFlag = false;
        dispatch(userRegistrationReject());

        break;
      }
    }
    // User Data Update On Json Server
    if (loginFlag) {
      axios
        .post(
          "https://jsonserver-twny.onrender.com/ideakartUser",
          inputBoxValue
        )
        .then(() => {
          dispatch(userRegistrationSuccess());
          navigate("/signin");
          return;
        });
    }
  };

  //  Return part

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={outerBoxForForm}
      sx={{ width: { xs: "75%", sm: "35%" }, overflow: "hidden" }}
    >
      <h1>Sign Up</h1>

      <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-name">Name</InputLabel>
        <Input
          onChange={handleOnChangeInputBoxValue}
          name="name"
          value={inputBoxValue.name}
          id="standard-adornment-name"
          type="text"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <AccountCircle />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-email">Email</InputLabel>
        <Input
          onChange={handleOnChangeInputBoxValue}
          name="email"
          value={inputBoxValue.email}
          id="standard-adornment-email"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <EmailTwoToneIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-number">Number</InputLabel>
        <Input
          onChange={handleOnChangeInputBoxValue}
          name="mobile"
          value={inputBoxValue.mobile}
          id="standard-adornment-number"
          endAdornment={
            <InputAdornment position="end">
              <IconButton>
                <CallTwoToneIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

      <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          name="password"
          value={inputBoxValue.password}
          id="standard-adornment-password"
          type={valuesPasswordViewPart.showPassword ? "text" : "password"}
          onChange={handleOnChangeInputBoxValue}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {valuesPasswordViewPart.showPassword ? (
                  <VisibilityOff />
                ) : (
                  <Visibility />
                )}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>

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
          Sign Up
        </Button>
      </Stack>

      <Box
        style={{
          margin: "10px 0",
          color: "grey",
          padding: "5px",
          width: "100%",
          whiteSpace: "pre-wrap",
          overflowWrap: "break-word",
        }}
      >
        {registrationPending ? (
          <CircularProgress />
        ) : registrationReject ? (
          "Registration failed, user already exists"
        ) : registrationSuccess ? (
          navigate("/signin")
        ) : (
          ""
        )}
      </Box>

      <Box>
        <p>
          Already have an account? <Link to="/signin">Log in</Link>
        </p>
      </Box>
    </Typography>
  );
}
