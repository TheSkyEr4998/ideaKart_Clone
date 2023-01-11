import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart } from "../Redux/action";

export default function About() {
  const { navbarInputPartValue } = useSelector((state) => state);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  return (
    <div
      style={{
        margin: "25px",
        fontWeight: "500",
        fontSize: "20px",
        fontFamily: "play",
      }}
    >
      <p style={{ margin: "25px", fontWeight: "700", fontSize: "32px" }}>
        About Ideakart
      </p>

      <p>
        Ideakart is a site that gives u an idea about the book you want to buy.
        We offer a huge collection of books in diverse categories.{" "}
      </p>
      <p>
        We have a user friendly search engine and a quick delivery system. With
        this we even provide best discounts on our books. You can write to us
        for any idea or any help you need.
      </p>
      <p>
        Ideakart is a site that gives u an idea and a platform for the book you
        want. We offer a huge collection of books in diverse categories.{" "}
      </p>
      <p>
        We have a user friendly search engine and a quick delivery system. With
        this we even provide best discounts on our books. You can write to us
        for any idea or any help you need.
      </p>
    </div>
  );
}
