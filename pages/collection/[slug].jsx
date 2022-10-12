import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_REVIEW_IMAGES } from "../../queries";
import { Box, Grid, Container } from "@mui/material";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Image from "mui-image";

import "yet-another-react-lightbox/styles.css";

const CollectionPage = () => {
  const [openImgIdx, setOpenImgIdx] = useState(-1);
  const router = useRouter();
  const { slug } = router.query;

  const { loading, data } = useQuery(GET_REVIEW_IMAGES, {
    variables: { slug },
  });

  if (loading) return <p>Loading...</p>;
  if (!data || !data.fashionShowV2) return <p>no data</p>;
  const {
    brand,
    channel,
    city,
    season,
    livestream,
    photosTout,
    galleries: { collection, detail },
    review: { body, contributor },
  } = data.fashionShowV2;
  const slides = collection.slidesV2.slide.map((slide) => ({
    src: slide.photosTout.url,
    alt: slide.photosTout.altText,
  }));

  return (
    <Container
      maxWidth="lg"
      sx={{
        textAlign: "justify",
        whiteSpace: "pre-wrap",
      }}
    >
      {brand.name} {channel.name} {city.name} {season.name} {photosTout?.url}
      {body} {contributor.author[0].name}
      <Grid container spacing={2}>
        {slides.map((slide, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Image
              src={slide.src}
              alt={slide.alt}
              sx={{
                p: {
                  xs: 0,
                  sm: 1,
                },
              }}
              onClick={() => setOpenImgIdx(idx)}
            />
          </Grid>
        ))}
      </Grid>
      <Lightbox
        styles={{
          container: { backgroundColor: "rgba(0, 0, 0, .6)" },
          button: { filter: "none" },
        }}
        open={openImgIdx >= 0}
        index={openImgIdx}
        close={() => setOpenImgIdx(-1)}
        slides={slides}
        plugins={[Zoom]}
        zoom={{ zoomInMultiplier: 2 }}
      />
    </Container>
  );
};

export default CollectionPage;

// import React from "react";
// import { useRouter } from "next/router";
// import { useQuery } from "@apollo/client";
// import { GET_COLLECTION_IMAGES } from "../../queries";

// const CollectionPage = () => {
//   const router = useRouter();
//   const { brandSlug, seasonSlug } = router.query;
//   const { loading, data } = useQuery(GET_COLLECTION_IMAGES, {
//     variables: {
//       brandSlug,
//       seasonSlug,
//     },
//   });

//   if (loading) return <p>Loading...</p>;
//   if (!data) return <p>no data</p>;
//   console.log(data);
//   return (
//     <div>
//       <h1>Collection Page </h1>
//     </div>
//   );
// };

// export default CollectionPage;
