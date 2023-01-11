import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  dataAddItemUpdateOurNot,
  navbarInputPart,
  cartPaymentCart,
} from "../Redux/action";
import axios from "axios";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import Fab from "@mui/material/Fab";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { styled } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { navbarInputPartValue, addItemUpdateOurNot, cartPaymentCartData } =
    useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  const [productList, setProductList] = React.useState({ data: [] });

  React.useEffect(() => {
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartProduct?product_cart=true`
      )
      .then((res) => {
        setProductList({ ...productList, data: res.data });
        counterDataFunForCartPage(res.data);
      });
  }, [addItemUpdateOurNot]);

  const counterDataFunForCartPage = (data) => {
    let dataItemCount = data.length;
    let dataItemQuiCount = 0;
    let dataItemTotal = 0;
    for (let i = 0; i < data.length; i++) {
      dataItemQuiCount += data[i].product_cart_quantity;
      dataItemTotal += data[i].product_cart_quantity * data[i].product_price;
    }
    dispatch(
      cartPaymentCart({
        ...cartPaymentCartData,
        dataItemCount,
        dataItemQuiCount,
        dataItemTotal,
      })
    );
  };
  const handleAddToCart = (id) => {
    let obj = { product_cart: false, product_cart_quantity: 0 };
    axios
      .patch(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`, obj)
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };
  const handleAddToCartAddValue = (id, value) => {
    let obj;
    {
      value == 0
        ? (obj = { product_cart: false, product_cart_quantity: value })
        : (obj = { product_cart_quantity: value });
    }
    axios
      .patch(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`, obj)
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };

  return (
    <Typography
      variant="div"
      noWrap
      component="div"
      style={{
        width: "100%",
        display: "grid",
        padding: "10px",
        fontFamily: "play",
      }}
      sx={{
        gridTemplateColumns: {
          xs: "1fr",
          sm: "48% 48%",
        },
        overflow: "hidden",
      }}
    >
      <Box>
        <h2>My Cart ({cartPaymentCartData.dataItemCount})</h2>
        <p
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0 10px",
          }}
        >
          <span>Basket ({cartPaymentCartData.dataItemQuiCount} items)</span>{" "}
          <span>&#8377; {cartPaymentCartData.dataItemTotal} /- </span>
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
              - &#8377; {(cartPaymentCartData.dataItemTotal * 5) / 100}{" "}
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
            <span>&#8377; {cartPaymentCartData.dataItemTotal} </span>
          </p>
          <p
            style={{
              display: "flex",
              justifyContent: "space-between",
              margin: "0 10px",
            }}
          >
            <span></span>{" "}
            <Link
              to={"/payment"}
              style={{
                padding: "10px 15px",
                border: "3px solid grey",
                textDecoration: "none",
                fontWeight: "bold",
                margin: "10px",
              }}
            >
              Place Order
            </Link>
          </p>
        </Box>
      </Box>
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
                  {element.product_price * element.product_cart_quantity} /-
                </p>
                <Box>
                  <StyledFabButton
                    color="secondary"
                    onClick={() =>
                      handleAddToCartAddValue(
                        element.id,
                        element.product_cart_quantity - 1
                      )
                    }
                  >
                    <RemoveIcon />
                  </StyledFabButton>
                  <StyledFabButton>
                    {element.product_cart_quantity}
                  </StyledFabButton>

                  <StyledFabButton
                    color="secondary"
                    onClick={() =>
                      handleAddToCartAddValue(
                        element.id,
                        element.product_cart_quantity + 1
                      )
                    }
                  >
                    <AddIcon />
                  </StyledFabButton>
                </Box>
              </Box>
            </Box>

            <StyledFab
              color="secondary"
              onClick={() => handleAddToCart(element.id)}
            >
              <RemoveShoppingCartIcon />
            </StyledFab>
          </Box>
        ))}
      </Box>
    </Typography>
  );
}

export default Cart;

const StyledFab = styled(Fab)({
  zIndex: 1,
  height: "40px",
  width: "40px",
});

const StyledFabButton = styled(Fab)({
  zIndex: 1,
  height: "10px",
  width: "20px",
  margin: "0 5px",
  padding: "2px",
});
