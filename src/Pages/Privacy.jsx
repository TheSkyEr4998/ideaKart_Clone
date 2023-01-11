import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { navbarInputPart } from "../Redux/action";

export default function Privacy() {
  const [expanded, setExpanded] = React.useState(false);

  const { navbarInputPartValue } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(navbarInputPart(""));
  }, [navbarInputPartValue]);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      style={{
        margin: "25px",
        fontFamily: "play",
      }}
    >
      <p style={{ margin: "25px", fontWeight: "700", fontSize: "32px" }}>
        Privacy Policy for IdeaKart
      </p>

      <p>
        At www.ideakart.com we consider the privacy of our visitors to be
        extremely important. This privacy policy document describes in detail
        the types of personal information is collected and recorded by
        www.ideakart.com and how we use it.
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
            Log Files
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              Like many other Web sites, www.ideakart.com makes use of log
              files. These files merely logs visitors to the site - usually a
              standard procedure for hosting companies and a part of hosting
              services's analytics. The information inside the log files
              includes internet protocol (IP) addresses, browser type, Internet
              Service Provider (ISP), date/time stamp, referring/exit pages, and
              possibly the number of clicks. This information is used to analyze
              trends, administer the site, track user's movement around the
              site, and gather demographic information. IP addresses, and other
              such information are not linked to any information that is
              personally identifiable.
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Cookies and Web Beacons
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              www.ideakart.com uses cookies to store information about visitors'
              preferences, to record user-specific information on which pages
              the site visitor accesses or visits, and to personalize or
              customize our web page content based upon visitors' browser type
              or other information that the visitor sends via their browser.
            </p>
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            DoubleClick DART Cookie
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ul>
              <li>
                Google, as a third party vendor, uses cookies to serve ads on
                www.ideakart.com.
              </li>
              <li>
                Google's use of the DART cookie enables it to serve ads to our
                site's visitors based upon their visit to www.ideakart.com and
                other sites on the Internet.
              </li>
              <li>
                {" "}
                Users may opt out of the use of the DART cookie by visiting the
                Google ad and content network privacy policy at the following
                URL -{" "}
                <a
                  href="http://www.google.com/privacy_ads.html"
                  target="_blank"
                >
                  http://www.google.com/privacy_privacy_ads.html
                </a>
              </li>
            </ul>
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
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Our Advertising Partners
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              Some of our advertising partners may use cookies and web beacons
              on our site. Our advertising partners include .......
            </p>
            <ul>
              <li>Google</li>
              <li>Amazon</li>
            </ul>
            <p>
              You may consult this listing to find the privacy policy for each
              of the advertising partners of www.ideakart.com.
            </p>
            <p>
              These third-party ad servers or ad networks use technology in
              their respective advertisements and links that appear on
              www.ideakart.com and which are sent directly to your browser. They
              automatically receive your IP address when this occurs. Other
              technologies (such as cookies, JavaScript, or Web Beacons) may
              also be used by our site's third-party ad networks to measure the
              effectiveness of their advertising campaigns and/or to personalize
              the advertising content that you see on the site.
            </p>
            <p>
              www.ideakart.com has no access to or control over these cookies
              that are used by third-party advertisers.
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
            Third Party Privacy Policies
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              You should consult the respective privacy policies of these
              third-party ad servers for more detailed information on their
              practices as well as for instructions about how to opt-out of
              certain practices. www.ideakart.com's privacy policy does not
              apply to, and we cannot control the activities of, such other
              advertisers or web sites.
            </p>
            <p>
              If you wish to disable cookies, you may do so through your
              individual browser options. More detailed information about cookie
              management with specific web browsers can be found at the
              browsers' respective websites.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel6bh-content"
          id="panel6bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Children's Information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              We believe it is important to provide added protection for
              children online. We encourage parents and guardians to spend time
              online with their children to observe, participate in and/or
              monitor and guide their online activity. www.ideakart.com does not
              knowingly collect any personally identifiable information from
              children under the age of 13. If a parent or guardian believes
              that www.ideakart.com has in its database the
              personally-identifiable information of a child under the age of
              13, please contact us immediately (using the contact in the first
              paragraph) and we will use our best efforts to promptly remove
              such information from our records.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel7bh-content"
          id="panel7bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>
            Online Privacy Policy Only
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              This privacy policy applies only to our online activities and is
              valid for visitors to our website and regarding information shared
              and/or collected there. This policy does not apply to any
              information collected offline or via channels other than this
              website.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel8bh-content"
          id="panel8bh-header"
        >
          <Typography sx={{ width: "33%", flexShrink: 0 }}>Consent</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <p>
              By using our website, you hereby consent to our privacy policy and
              agree to its terms.
            </p>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
