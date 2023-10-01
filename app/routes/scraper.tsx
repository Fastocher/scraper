import { Box, Container, Pagination } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useLoaderData } from "@remix-run/react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import { useState } from "react";
import usePagination from "~/utils/pagination";
import type { loader } from "./_index";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    paritialVisibilityGutter: 60,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    paritialVisibilityGutter: 50,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    paritialVisibilityGutter: 30,
  },
};

// export const loader = async ({ request }: LoaderFunctionArgs) => {
//   const listAds = await getAd();
//   return json({ listAds });
// };

export const Scraper = () => {
  const [page, setPage] = useState(1);
  const PER_PAGE = 24;
  const data = useLoaderData<typeof loader>();

  const count = Math.ceil(data.listAds.length / PER_PAGE);
  const _DATA = usePagination(data.listAds, PER_PAGE);

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setPage(page);
    _DATA.jump(page);
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingBottom: 4,
        paddingTop: 4,
      }}
    >
      <Pagination count={count} page={page} onChange={handleChange} />
      {_DATA.currentData().map((ad, index) => (
        <Box
          key={ad.id}
          sx={{
            padding: 3,
            marginBottom: 3,
            marginTop: 3,
            bgcolor: "#fff",
            width: "100%",
            borderRadius: 3,
            boxShadow: "0px 10px 15px -3px rgba(0,0,0,0.1)",
          }}
        >
          <Carousel
            ssr
            partialVisbile={false}
            itemClass="image-item pb-8"
            responsive={responsive}
            autoPlay={false}
          >
            {ad.images.map((image) => (
              <img
                loading="lazy"
                src={image}
                key={image}
                alt={image}
                style={{ borderRadius: 4, padding: 4 }}
              />
            ))}
          </Carousel>

          <Typography variant="h6">{ad.title}</Typography>
        </Box>
      ))}
      <Pagination count={count} page={page} onChange={handleChange} />
    </Container>
  );
};

export default Scraper;
