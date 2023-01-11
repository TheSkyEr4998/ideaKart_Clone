import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { dataAddItemUpdateOurNot, navbarInputPart } from "../Redux/action";
import axios from "axios";
import Box from "@mui/material/Box";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import Fab from "@mui/material/Fab";
import { styled } from "@mui/material/styles";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function Product() {
  const [productList, setProductList] = React.useState({
    product_img_url: "",
    product_name: "",
    product_sub_name: "",
    product_price: 0,
    product_cart: true,
    product_cart_quantity: 0,
    product_about: {
      Product_details: "",
      product_description: "",
      product_description_and_author: "",
    },
    id: 1,
  });

  const { navbarInputPartValue, addItemUpdateOurNot } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const { id } = useParams();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  React.useEffect(() => {
    axios
      .get(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`)
      .then((res) => {
        setProductList(res.data);
      });
  }, [addItemUpdateOurNot]);

  const handleAddToCart = (val) => {
    let obj;
    {
      productList.product_cart
        ? (obj = {
            ...productList,
            product_cart: val,
            product_cart_quantity: 0,
          })
        : (obj = {
            ...productList,
            product_cart: val,
            product_cart_quantity: 1,
          });
    }
    axios
      .patch(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`, obj)
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };

  const handleAddToCartAddValue = (value) => {
    let obj;
    {
      value === 0
        ? (obj = { product_cart: false, product_cart_quantity: value })
        : (obj = { product_cart_quantity: value });
    }
    axios
      .patch(`https://jsonserver-twny.onrender.com/ideakartProduct/${id}`, obj)
      .then(() => dispatch(dataAddItemUpdateOurNot(!addItemUpdateOurNot)));
  };

  return (
    <Box>
      <Typography
        variant="div"
        noWrap
        component="div"
        style={outerBoxForForm}
        sx={{
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 2fr",
          },
          overflow: "hidden",
        }}
      >
        <Box>
          <img
            src={productList.product_img_url}
            alt=""
            style={{ width: "100%" }}
          />
        </Box>
        <Box
          style={{
            padding: "25px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box>
            <p
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                margin: "0",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
              }}
            >
              {productList.product_name}
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "0",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                color: "grey",
              }}
            >
              {productList.product_sub_name}
            </p>
            <p
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                margin: "10px 5px",
                whiteSpace: "pre-wrap",
                overflowWrap: "break-word",
                color: "#0254a5",
                borderTop: "1px solid grey",
                textAlign: "start",
              }}
            >
              Buy new: &#8377; {productList.product_price} /-
            </p>
          </Box>
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              {productList.product_cart ? (
                <StyledFab
                  color="secondary"
                  onClick={() => handleAddToCart(!productList.product_cart)}
                >
                  <RemoveShoppingCartIcon />
                </StyledFab>
              ) : (
                <StyledFab
                  color="secondary"
                  onClick={() => handleAddToCart(!productList.product_cart)}
                >
                  <ShoppingCartIcon />
                </StyledFab>
              )}
            </Box>
            {productList.product_cart ? (
              <Box style={{ marginRight: "50px" }}>
                <StyledFabButton
                  color="secondary"
                  onClick={() =>
                    handleAddToCartAddValue(
                      productList.product_cart_quantity - 1
                    )
                  }
                >
                  <RemoveIcon />
                </StyledFabButton>
                <StyledFabButton>
                  {productList.product_cart_quantity}
                </StyledFabButton>

                <StyledFabButton
                  color="secondary"
                  onClick={() =>
                    handleAddToCartAddValue(
                      productList.product_cart_quantity + 1
                    )
                  }
                >
                  <AddIcon />
                </StyledFabButton>
              </Box>
            ) : (
              ""
            )}
          </Box>
        </Box>
      </Typography>
      <Box style={{ width: "80%", margin: "20px auto" }}>
        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Product details
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{
                __html: productList.product_about.Product_details,
              }}
            ></Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2bh-content"
            id="panel2bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Product description
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{
                __html:
                  productList.product_about.product_description_and_author,
              }}
            ></Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3bh-content"
            id="panel3bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              Other Part
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              dangerouslySetInnerHTML={{
                __html: productList.product_about.product_description,
              }}
            ></Typography>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
}

export default Product;

const StyledFab = styled(Fab)({
  zIndex: 1,
  height: "40px",
  width: "40px",
  margin: "0 auto",
});

const StyledFabButton = styled(Fab)({
  zIndex: 1,
  height: "40px",
  width: "40px",
  margin: "0 10px",
  padding: "2px",
});

const outerBoxForForm = {
  display: "grid",
  textAlign: "center",
  fontFamily: "play",
  gap: "10px",
  width: "95%",
  margin: "20px auto",
};
