import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import {
  dataAddItemUpdateOurNot,
  navbarInputPart,
  paymentPending,
  paymentSuccess,
} from "../Redux/action";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import { CircularProgress } from "@mui/material";

const steps = ["Your Cart", "Summary", "Payment"];

export default function Payment() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [productList, setProductList] = React.useState({ data: [] });

  const [sendOtpPart, setSendOtpPart] = React.useState(false);

  const {
    navbarInputPartValue,
    cartPaymentCartData,
    addItemUpdateOurNot,
    paymentStatusPending,
  } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    navigate("/");
  };

  React.useEffect(() => {
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartProduct?product_cart=true`
      )
      .then((res) => {
        setProductList({ ...productList, data: res.data });
      });
  }, [addItemUpdateOurNot]);

  const resetAllProducts = () => {
    axios.patch(
      `https://jsonserver-twny.onrender.com/ideakartUser/${localStorage.getItem(
        "userLogId"
      )}`,
      productList
    );
    let obj = {
      product_cart: false,
      product_cart_quantity: 0,
    };

    productList.data.map((item) => {
      axios
        .patch(
          `https://jsonserver-twny.onrender.com/ideakartProduct/${item.id}`,
          obj
        )
        .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
    });
    dispatch(paymentPending());
    setTimeout(() => {
      dispatch(paymentSuccess());
      handleComplete();
    }, 2000);
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
      <Box sx={{ width: "95%", margin: "auto" }}>
        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <div>
          {allStepsCompleted() ? (
            <React.Fragment>
              <Typography
                sx={{ mt: 2, mb: 1 }}
                style={{
                  fontSize: "32px",
                  fontWeight: "bold",
                  fontFamily: "play",
                  whiteSpace: "pre-wrap",
                  overflowWrap: "break-word",
                  margin: "80px 0",
                }}
              >
                Your transaction has been successfully completed
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleReset}>Go To Home Page</Button>
              </Box>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                {activeStep + 1 === 1 ? (
                  <Box>
                    {productList.data.map((element) => (
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
                              {element.product_price *
                                element.product_cart_quantity}{" "}
                              /-
                            </p>
                          </Box>
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : activeStep + 1 === 2 ? (
                  <Box>
                    <h2 style={{ textAlign: "start" }}>
                      My Cart ({cartPaymentCartData.dataItemCount})
                    </h2>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "0 10px",
                      }}
                    >
                      <span>
                        Basket ({cartPaymentCartData.dataItemQuiCount} items)
                      </span>{" "}
                      <span>
                        &#8377; {cartPaymentCartData.dataItemTotal} /-{" "}
                      </span>
                    </p>
                    <p>Payment Details - </p>
                    <Box style={{ margin: "0 20px" }}>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "5px 10px",
                          borderBottom: "1px solid grey",
                          paddingBottom: "3px",
                        }}
                      >
                        <span>MRP Total</span>{" "}
                        <span>
                          &#8377;{" "}
                          {cartPaymentCartData.dataItemTotal +
                            (cartPaymentCartData.dataItemTotal * 5) / 100}{" "}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "5px 10px",
                          borderBottom: "1px solid grey",
                          paddingBottom: "3px",
                        }}
                      >
                        <span>Product Discount</span>{" "}
                        <span>
                          - &#8377;{" "}
                          {(cartPaymentCartData.dataItemTotal * 5) / 100}{" "}
                        </span>
                      </p>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          margin: "5px 10px",
                          borderBottom: "1px solid grey",
                          paddingBottom: "3px",
                        }}
                      >
                        <span>Total Amount</span>{" "}
                        <span>
                          &#8377; {cartPaymentCartData.dataItemTotal}{" "}
                        </span>
                      </p>
                    </Box>
                  </Box>
                ) : (
                  <Box style={{ display: "flex", flexDirection: "column" }}>
                    <h2>Payment Gateway</h2>
                    <span
                      style={{
                        fontSize: "14px",
                        textAlign: "start",
                        color: "grey",
                      }}
                    >
                      Enter your Debit card details
                    </span>
                    <FormControl sx={{ m: 1, width: "95%" }} variant="standard">
                      <InputLabel htmlFor="standard-adornment-username">
                        Card Number
                      </InputLabel>
                      <Input
                        name="cardNumber"
                        placeholder="Enter your 16 digit card number"
                        required
                        id="standard-adornment-username"
                      />
                    </FormControl>
                    <Box
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <FormControl
                        sx={{ m: 1, width: "25%" }}
                        variant="standard"
                      >
                        <InputLabel htmlFor="standard-adornment-username">
                          CVV Number
                        </InputLabel>
                        <Input
                          name="cardNumber"
                          placeholder="Enter your CVV"
                          required
                          id="standard-adornment-username"
                        />
                      </FormControl>
                      <FormControl
                        sx={{ m: 1, width: "65%" }}
                        variant="standard"
                      >
                        <InputLabel htmlFor="standard-adornment-username">
                          Exp Date
                        </InputLabel>
                        <Input
                          name="cardNumber"
                          placeholder="Enter card exp Date MM/YYYY"
                          required
                          id="standard-adornment-username"
                        />
                      </FormControl>
                    </Box>

                    {sendOtpPart ? (
                      <Box
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <FormControl
                          sx={{ m: 1, width: "25%" }}
                          variant="standard"
                        >
                          <InputLabel htmlFor="standard-adornment-username">
                            OTP
                          </InputLabel>
                          <Input
                            name="cardNumber"
                            placeholder="Enter your OTP"
                            required
                            id="standard-adornment-username"
                          />
                        </FormControl>

                        {completedSteps() === totalSteps() - 1 ? (
                          <Button onClick={resetAllProducts}>
                            Make Payment
                          </Button>
                        ) : (
                          <Button onClick={handleComplete}>Next Step</Button>
                        )}
                      </Box>
                    ) : (
                      <Box>
                        <Button
                          onClick={() => {
                            setSendOtpPart(true);
                          }}
                          sx={{ mr: 1 }}
                        >
                          SEND OTP
                        </Button>
                      </Box>
                    )}
                    <Box style={{ width: "100%", alignItems: "center" }}>
                      {paymentStatusPending ? <CircularProgress /> : ""}
                    </Box>
                  </Box>
                )}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                <Button
                  color="inherit"
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                ></Button>
                <Box sx={{ flex: "1 1 auto" }} />
                <Button onClick={handleNext} sx={{ mr: 1 }}></Button>
                {activeStep !== steps.length &&
                  (completed[activeStep] ? (
                    <Typography
                      variant="caption"
                      sx={{ display: "inline-block" }}
                    >
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button onClick={handleComplete}>
                      {completedSteps() === totalSteps() - 1 ? "" : "Next Step"}
                    </Button>
                  ))}
              </Box>
            </React.Fragment>
          )}
        </div>
      </Box>
      {/* part 2 */}
      <Box>
        <img
          src="https://cdn.dribbble.com/users/1280935/screenshots/6974685/media/ec4c386222b837da0ff6eabec3f59ba3.gif"
          style={{ width: "100%" }}
        />
      </Box>
    </Typography>
  );
}

const outerBoxForForm = {
  display: "grid",
  textAlign: "center",
  fontFamily: "play",
  gap: "10px",
  width: "95%",
  margin: "20px auto",
};
