import React from "react";
import { Link } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

function Footer() {
  const footerPartLink = { textDecoration: "none", color: "white" };
  const [progress, setProgress] = React.useState(0);
  const [buffer, setBuffer] = React.useState(10);

  const progressRef = React.useRef(() => {});
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  React.useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  });

  return (
    <React.Fragment>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
      <div
        style={{
          padding: "10px 30px",
          // backgroundColor: "#0254a5d9",
          color: "white",
          background:
            "linear-gradient(0deg, rgba(2,84,165,0.5) 0%, rgba(2,84,160,0.8) 100%)",
        }}
      >
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>Get To Know Us</p>

        <ul>
          <li>
            <Link to="/about" style={footerPartLink}>
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" style={footerPartLink}>
              Contact
            </Link>
          </li>
          <li>
            <Link to="/privacy" style={footerPartLink}>
              Privacy Policy
            </Link>
          </li>
          <li>
            <Link to="/refund-policy" style={footerPartLink}>
              Refund Policy
            </Link>
          </li>
        </ul>
      </div>
    </React.Fragment>
  );
}

export default Footer;
