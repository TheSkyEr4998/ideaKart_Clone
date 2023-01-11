import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart } from "../Redux/action";

export default function RefundPolicy() {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const { navbarInputPartValue } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  return (
    <div
      style={{
        margin: "25px",
        fontFamily: "play",
      }}
    >
      <p style={{ margin: "25px", fontWeight: "700", fontSize: "32px" }}>
        Return & Refund Policy
      </p>

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
            Return & Refund Policy
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>Thanks for shopping at Ideakart.com.</p>
            <p>
              If you are not entirely satisfied with your purchase, we're here
              to help.
            </p>
          </Typography>
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Returns</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              You have 7 calendar days to return an item from the date you
              received it.
            </p>
            <p>
              To be eligible for a return, your item must be unused and in the
              same condition that you received it.
            </p>
            <p>Your item must be in the original packaging.</p>
            <p>Your item needs to have the receipt or proof of purchase.</p>
          </Typography>
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Refunds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              Once we receive your item, we will inspect it and notify you that
              we have received your returned item. We will immediately notify
              you on the status of your refund after inspecting the item.
            </p>
            <p>
              If your return is approved, we will initiate a refund to your
              method of payment(Credit Card/Debit Card/Bank etc).
            </p>
            <p>
              You will receive the credit within a certain amount of days,
              depending on your banks policies.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Shipping</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              You will be responsible for paying for your own shipping costs for
              returning your item. Shipping costs are non­refundable.
            </p>
            <p>
              If you receive a refund, the cost of return shipping will be
              deducted from your refund.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5bh-content"
          id="panel5bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Contact Us
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              If you have any questions on how to return your item to us,{" "}
              <Link to={"/contact"}>contact us</Link>
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
