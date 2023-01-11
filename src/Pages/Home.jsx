import React from "react";
import ProductItem from "../Components/ProductItem";
import Typography from "@mui/material/Typography";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  dataShowPending,
  dataShowReject,
  dataShowSuccess,
} from "../Redux/action";
import { CircularProgress } from "@mui/material";

function Home() {
  const [productList, setProductList] = React.useState({ data: [] });
  let [page, setPage] = React.useState(1);
  let [Total_Data, setTotal_Data] = React.useState(2000);
  let PER_PAGE = 20;
  const count = Math.ceil(Total_Data / PER_PAGE);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const {
    dataStatusPending,
    dataStatusReject,
    dataStatusSuccess,
    addItemUpdateOurNot,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(dataShowPending());
    axios
      .get(
        `https://jsonserver-twny.onrender.com/ideakartProduct?_page=${page}&_limit=${PER_PAGE}`
      )
      .then((res) => {
        setTotal_Data(res.headers["x-total-count"]);
        setProductList({ ...productList, data: res.data });
        dispatch(dataShowSuccess());
        return;
      })
      .catch(() => dispatch(dataShowReject()));
  }, [page, addItemUpdateOurNot]);

  return (
    <React.Fragment>
      {dataStatusPending ? (
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      ) : dataStatusReject ? (
        ""
      ) : dataStatusSuccess ? (
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
      ) : (
        ""
      )}

      <Stack spacing={2} style={{ margin: "15px", alignItems: "end" }}>
        <Pagination
          count={count}
          page={page}
          onChange={handleChange}
          showFirstButton
          showLastButton
          variant="outlined"
          color="primary"
        />
      </Stack>
    </React.Fragment>
  );
}

export default Home;

const outerBoxForForm = {
  display: "grid",
  padding: "10px",
  textAlign: "center",
  fontFamily: "play",
  gap: "10px",
};
