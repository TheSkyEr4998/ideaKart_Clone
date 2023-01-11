import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart } from "../Redux/action";

function NotFound() {
  const { navbarInputPartValue } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  const GoToHomePageButton = {
    textDecoration: "none",
    color: "blue",
    fontWeight: "bold",
    fontSize: "25px",
    border: "1px solid gray",
    padding: "10px 25px",
    borderRadius: "7px",
  };

  return (
    <div
      style={{
        fontSize: "72px",
        margin: "50px 0",
        textAlign: "center",
        fontFamily: "play",
      }}
    >
      404 <br />
      Page Not Found
      <br />
      <Link to="/" style={GoToHomePageButton}>
        Go To Home Page
      </Link>
    </div>
  );
}

export default NotFound;
