import * as React from "react";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import SellIcon from "@mui/icons-material/Sell";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { dataAddItemUpdateOurNot } from "../Redux/action";
import { useNavigate } from "react-router-dom";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -20,
  left: 0,
  right: 0,
  height: "40px",
  width: "40px",
  margin: "0 auto",
});

export default function ProductItem({ element }) {
  const { addItemUpdateOurNot } = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (id, val) => {
    let obj;
    {
      element.product_cart
        ? (obj = {
            ...element,
            product_cart: val,
            product_cart_quantity: 0,
          })
        : (obj = {
            ...element,
            product_cart: val,
            product_cart_quantity: 1,
          });
    }
    axios
      .patch(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`, obj)
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };

  return (
    <Box
      position="relative"
      style={{
        width: "100%",
        height: "390px",
        backgroundColor: "#c8e3ff",
        color: "#fff",
        letterSpacing: "0.5px",
        fontSize: "16px",
        fontWeight: "500",
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        borderRadius: "10px 10px 0 0",
        overflow: "hidden",
      }}
    >
      <img
        src={element.product_img_url}
        alt=""
        style={{ height: "250px", width: "100%" }}
      />
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
        {element.product_name.slice(0, 51)}...
      </p>

      <Box
        position="absolute"
        color="primary"
        sx={{ top: "auto", bottom: 0 }}
        style={{
          width: "100%",
          height: "30px",
          background:
            "linear-gradient(180deg, rgba(2,84,165,0.5) 0%, rgba(2,84,160,0.8) 100%)",
          padding: "5px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box
          style={{
            display: "flex",
            marginLeft: "7px",
            alignItems: "center",
            gap: "5px",
          }}
        >
          &#8377;
          {element.product_price}
          <SellIcon />
        </Box>
        <StyledFab
          color="secondary"
          onClick={() => handleAddToCart(element.id, !element.product_cart)}
        >
          {element.product_cart ? (
            <RemoveShoppingCartIcon />
          ) : (
            <ShoppingCartIcon />
          )}
        </StyledFab>
        <Box
          onClick={() => navigate(`/product/${element.id}`)}
          style={{
            display: "flex",
            marginRight: "7px",
            alignItems: "center",
            gap: "5px",
            cursor: "pointer",
          }}
        >
          View
          <ReadMoreIcon />
        </Box>
      </Box>
    </Box>
  );
}
