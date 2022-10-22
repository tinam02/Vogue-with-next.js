import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_REVIEW_IMAGES } from "../../queries";
import {
  Box,
  Avatar,
  Grid,
  Container,
  Typography,
  Link as MuiLink,
  ButtonBase,
} from "@mui/material";
import Link from "next/link";
import Image from "mui-image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import ReactMarkdown from "react-markdown";

import "yet-another-react-lightbox/styles.css";
import AuthorCard from "../../components/UI/AuthorCard";

const CollectionPage = () => {
  const [openImgIdx, setOpenImgIdx] = useState(-1);
  const [openDetailImgIdx, setOpenDetailImgIdx] = useState(-1);
  const [openDetailsGallery, setOpenDetailsGallery] = useState(false);
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
  const slides = collection.slidesV2.slide?.map((slide) => ({
    src: slide.photosTout.url,
    alt: slide.photosTout.altText,
  }));

  const detailSlides = detail?.slidesV2?.slide?.map((slide) => ({
    src: slide.photosTout.url,
    alt: slide.photosTout.altText,
  }));
  console.log(body)
  return (
    <Container
      sx={{
        textAlign: "justify",
        whiteSpace: "pre-wrap",
        mb: 2,
      }}
    >
      <Box
        sx={{
          fontFamily: "BB",
          display: "flex",
          gap: 2,
          fontSize: "14px",
          mb: 2,
        }}
      >
        <Link
          passHref
          href={{
            pathname: "/season/[slug]",
            query: {
              slug: season.slug,
            },
          }}
        >
          <MuiLink underline="hover" sx={{ color: "text.secondary" }}>
            / {season.name.toLowerCase()}
          </MuiLink>
        </Link>
        <Link
          passHref
          href={{
            pathname: "/brand/[slug]",
            query: {
              slug: brand.slug,
            },
          }}
        >
          <MuiLink underline="hover" sx={{ color: "text.secondary" }}>
            / {brand.name.toLowerCase()}
          </MuiLink>
        </Link>
      </Box>
      <Typography variant="body2" sx={{ color: "text.secondary", pt: "2px" }}>
        {city?.name}
      </Typography>
      <Typography
        sx={{
          textTransform: "uppercase",
          fontSize: {
            xs: "24px",
            md: "34px",
          },
        }}
      >
        &#65103;{brand.name} {channel?.name || "review"}&#65103;
      </Typography>
      <ReactMarkdown>{body}</ReactMarkdown>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          mb: 3,
          mt: 2,
        }}
      >
        {contributor && (
          <AuthorCard
            name={contributor.author[0]?.name}
            avatar={contributor.author[0]?.photosTout?.resizedUrl}
          />
        )}
      </Box>
      <Grid container spacing={2}>
        {collection.slidesV2.slide.map((slide, idx) => (
          <Grid item xs={12} sm={6} md={3} key={idx}>
            <Image
              src={slide.photosTout.resizedUrl}
              alt={slide.photosTout.altText}
              sx={{
                cursor: "pointer",
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
      {detailSlides && (
        <ButtonBase
          onClick={() => setOpenDetailsGallery((prev) => !prev)}
          sx={{
            display: "flex",
            fontFamily: "BB Condensed",
            fontSize: {
              xs: "24px",
              md: "34px",
            },
            mt: 4,
            mb: openDetailsGallery ? 0 : 8,
          }}
        >
          DETAILS GALLERY
          <Box
            sx={{
              transform: openDetailsGallery ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.5s",
            }}
          >
            &#65291;
          </Box>
        </ButtonBase>
      )}
      {detailSlides && openDetailsGallery && (
        <>
          <Grid container spacing={2}>
            {detail.slidesV2.slide.map((slide, idx) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={idx}>
                  <Image
                    src={slide.photosTout.resizedUrl}
                    alt={slide.photosTout.altText}
                    height={300}
                    sx={{
                      cursor: "pointer",
                    }}
                    onClick={() => setOpenDetailImgIdx(idx)}
                  />
                </Grid>
              );
            })}
          </Grid>
          <Lightbox
            styles={{
              container: { backgroundColor: "rgba(0, 0, 0, .6)" },
              button: { filter: "none" },
            }}
            open={openDetailImgIdx >= 0}
            index={openDetailImgIdx}
            close={() => setOpenDetailImgIdx(-1)}
            slides={detailSlides}
            plugins={[Zoom]}
            zoom={{ zoomInMultiplier: 3 }}
          />
        </>
      )}
    </Container>
  );
};

export default CollectionPage;
