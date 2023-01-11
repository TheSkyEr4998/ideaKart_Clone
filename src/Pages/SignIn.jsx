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
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import {
  userLoginPending,
  userLoginReject,
  userLoginSuccess,
  navbarInputPart,
} from "../Redux/action";
import axios from "axios";

// Sign In Page Return Part

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // status part
  const { loginPending, loginReject, loginSuccess, navbarInputPartValue } =
    useSelector((state) => state);

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  const [inputBoxValue, setInputBoxValue] = React.useState({
    password: "",
    username: "",
  });

  // Password show and hide button part
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

  // Key press input part

  const handleOnChangeInputBoxValue = (e) => {
    const { name, value } = e.target;
    setInputBoxValue({ ...inputBoxValue, [name]: value });
  };

  const userSignInDataResSend = () => {
    dispatch(userLoginPending());
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartUser?q=${inputBoxValue.username}`
      )
      .then((res) => {
        stortokenId(res.data);
      })
      .catch(() => dispatch(userLoginReject()));
  };

  const stortokenId = (data) => {
    let loginFlag = true;
    for (let i = 0; i < data.length; i++) {
      if (
        (data[i].email === inputBoxValue.username &&
          data[i].password === inputBoxValue.password) ||
        (data[i].mobile === inputBoxValue.username &&
          data[i].password === inputBoxValue.password)
      ) {
        localStorage.setItem("userLogStatus", true);
        localStorage.setItem("userLogId", data[i].id);
        dispatch(userLoginSuccess(true));
        loginFlag = false;
        break;
      }
    }
    if (loginFlag) {
      dispatch(userLoginReject());
    } else {
      navigate("/");
    }
  };

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

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={outerBoxForForm}
      sx={{ width: { xs: "75%", sm: "35%" }, overflow: "hidden" }}
    >
      <h1>Sign In</h1>
      <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
        <InputLabel htmlFor="standard-adornment-username">
          Email or Number
        </InputLabel>
        <Input
          onChange={handleOnChangeInputBoxValue}
          name="username"
          value={inputBoxValue.username}
          id="standard-adornment-username"
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
      <Stack direction="row" spacing={1} style={{ margin: "auto" }}>
        <Button
          onClick={() => {
            userSignInDataResSend();
          }}
        >
          Login
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
        {loginPending ? (
          <CircularProgress />
        ) : loginReject ? (
          "Invalid login creadentials, Please try again."
        ) : loginSuccess ? (
          navigate("/")
        ) : (
          ""
        )}
      </Box>
      <Box>
        <p>
          No account? <Link to="/signup">Create one</Link>
        </p>
      </Box>
    </Typography>
  );
}
