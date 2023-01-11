import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Popover from "@mui/material/Popover";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ProductItem from "../Components/ProductItem";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart, userLoginSuccess } from "../Redux/action";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";

export default function Navbar() {
  const { loginSuccess, addItemUpdateOurNot, navbarInputPartValue } =
    useSelector((state) => state);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [addToCartItemsCount, setAddToCartItemsCount] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productList, setProductList] = React.useState({ data: [] });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  React.useEffect(() => {
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartProduct?product_cart=true`
      )
      .then((res) => {
        setAddToCartItemsCount(res.data.length);
      });
  }, [addItemUpdateOurNot]);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const hendleLogoutUser = () => {
    localStorage.clear();
    dispatch(userLoginSuccess(false));
    navigate("/");
  };

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {loginSuccess === true ||
      localStorage.getItem("userLogStatus") === true ? (
        <React.Fragment>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <HomeIcon onClick={() => navigate("/")} />
            </IconButton>
            <p onClick={() => navigate("/")}>Home</p>
          </MenuItem>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={addToCartItemsCount} color="error">
                {addToCartItemsCount === 0 ? (
                  <React.Fragment>
                    <Typography
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      <ShoppingBasketIcon />
                    </Typography>
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Cart isEmpty</Typography>
                    </Popover>
                  </React.Fragment>
                ) : (
                  <ShoppingCartCheckoutIcon onClick={() => navigate("/cart")} />
                )}
              </Badge>
            </IconButton>
            <p onClick={() => navigate("/cart")}>Cart</p>
          </MenuItem>
          <MenuItem>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="primary-search-account-menu"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle onClick={() => navigate("/profile")} />
            </IconButton>
            <p onClick={() => navigate("/profile")}>Profile</p>
          </MenuItem>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <LogoutIcon onClick={() => hendleLogoutUser()} />
            </IconButton>
            <p onClick={() => hendleLogoutUser()}>Logout</p>
          </MenuItem>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <HomeIcon onClick={() => navigate("/")} />
            </IconButton>
            <p onClick={() => navigate("/")}>Home</p>
          </MenuItem>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={addToCartItemsCount} color="error">
                {addToCartItemsCount === 0 ? (
                  <>
                    <Typography
                      aria-owns={open ? "mouse-over-popover" : undefined}
                      aria-haspopup="true"
                      onMouseEnter={handlePopoverOpen}
                      onMouseLeave={handlePopoverClose}
                    >
                      <ShoppingBasketIcon />
                    </Typography>
                    <Popover
                      id="mouse-over-popover"
                      sx={{
                        pointerEvents: "none",
                      }}
                      open={open}
                      anchorEl={anchorEl}
                      anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                      }}
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "left",
                      }}
                      onClose={handlePopoverClose}
                      disableRestoreFocus
                    >
                      <Typography sx={{ p: 1 }}>Cart isEmpty</Typography>
                    </Popover>
                  </>
                ) : (
                  <ShoppingCartCheckoutIcon onClick={() => navigate("/cart")} />
                )}
              </Badge>
            </IconButton>
            <p onClick={() => navigate("/cart")}>Cart</p>
          </MenuItem>
          <MenuItem>
            <IconButton size="large" color="inherit">
              <LoginIcon onClick={() => navigate("/signin")} />
            </IconButton>
            <p onClick={() => navigate("/signin")}>Login</p>
          </MenuItem>
        </React.Fragment>
      )}
    </Menu>
  );

  React.useEffect(() => {
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartProduct?q=${navbarInputPartValue}&_limit=10`
      )
      .then((res) => {
        setProductList({ ...productList, data: res.data });
      });
  }, [navbarInputPartValue, addItemUpdateOurNot]);

  return (
    <React.Fragment>
      <Box
        sx={{
          flexGrow: 1,
          position: "fixed",
          width: "100%",
          zIndex: 5,
        }}
      >
        <AppBar position="static" style={{ backgroundColor: "#0254a5" }}>
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ display: { xs: "none", sm: "block" }, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              IDEAKART
            </Typography>

            <Paper
              component="form"
              sx={{
                p: "2px 4px",
                display: "flex",
                alignItems: "center",
                width: 400,
                margin: "auto 2%",
              }}
            >
              <DebounceInput
                style={{
                  height: "100%",
                  width: "100%",
                  padding: "3px 7px",
                  fontSize: "16px",
                  outline: "none",
                  background: "none",
                  border: "none",
                }}
                placeholder="Search..."
                minLength={2}
                value={navbarInputPartValue}
                debounceTimeout={1000}
                onChange={(event) =>
                  dispatch(navbarInputPart(event.target.value))
                }
              />
              <IconButton type="button" sx={{ p: "5px" }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>

            {loginSuccess === true ||
            localStorage.getItem("userLogStatus") === true ? (
              <React.Fragment>
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={addToCartItemsCount} color="error">
                      {addToCartItemsCount === 0 ? (
                        <React.Fragment>
                          <Typography
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          >
                            <ShoppingBasketIcon />
                          </Typography>
                          <Popover
                            id="mouse-over-popover"
                            sx={{
                              pointerEvents: "none",
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            <Typography sx={{ p: 1 }}>Cart isEmpty</Typography>
                          </Popover>
                        </React.Fragment>
                      ) : (
                        <ShoppingCartCheckoutIcon
                          onClick={() => navigate("/cart")}
                        />
                      )}
                    </Badge>
                  </IconButton>

                  <IconButton
                    size="large"
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                  >
                    <AccountCircle onClick={() => navigate("/profile")} />
                  </IconButton>
                  <IconButton size="large" color="inherit">
                    <LogoutIcon onClick={() => hendleLogoutUser()} />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Box sx={{ flexGrow: 1 }} />

                <Box sx={{ display: { xs: "none", md: "flex" } }}>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={addToCartItemsCount} color="error">
                      {addToCartItemsCount === 0 ? (
                        <React.Fragment>
                          <Typography
                            aria-owns={open ? "mouse-over-popover" : undefined}
                            aria-haspopup="true"
                            onMouseEnter={handlePopoverOpen}
                            onMouseLeave={handlePopoverClose}
                          >
                            <ShoppingBasketIcon />
                          </Typography>
                          <Popover
                            id="mouse-over-popover"
                            sx={{
                              pointerEvents: "none",
                            }}
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            transformOrigin={{
                              vertical: "top",
                              horizontal: "left",
                            }}
                            onClose={handlePopoverClose}
                            disableRestoreFocus
                          >
                            <Typography sx={{ p: 1 }}>Cart isEmpty</Typography>
                          </Popover>
                        </React.Fragment>
                      ) : (
                        <ShoppingCartCheckoutIcon
                          onClick={() => navigate("/cart")}
                        />
                      )}
                    </Badge>
                  </IconButton>
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <LoginIcon onClick={() => navigate("/signin")} />
                  </IconButton>
                </Box>
                <Box sx={{ display: { xs: "flex", md: "none" } }}>
                  <IconButton
                    size="large"
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </Box>
              </React.Fragment>
            )}
          </Toolbar>
        </AppBar>

        {renderMobileMenu}
      </Box>

      <div
        style={{
          height: "58px",
          marginBottom: "10px",
        }}
      ></div>

      {navbarInputPartValue !== "" ? (
        <React.Fragment>
          <p
            style={{
              margin: "10px 0",
              color: "black",
              padding: "10px",
              width: "100%",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              fontFamily: "play",
            }}
          >
            Your Search Results ({productList.data.length})
          </p>
          <Typography
            variant="div"
            noWrap
            component="div"
            style={outerBoxForForm}
            sx={{
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr 1fr",
                md: "1fr 1fr 1fr 1fr",
              },
              overflow: "hidden",
            }}
          >
            {productList.data.map((element) => {
              return <ProductItem element={element} key={element.id} />;
            })}
          </Typography>
          <p
            style={{
              margin: "10px 0",
              color: "black",
              padding: "10px",
              width: "100%",
              whiteSpace: "pre-wrap",
              overflowWrap: "break-word",
              fontFamily: "play",
            }}
          >
            Other Results
          </p>
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
}

const outerBoxForForm = {
  display: "grid",
  padding: "10px",
  textAlign: "center",
  fontFamily: "play",
  gap: "10px",
};
