import "yet-another-react-lightbox/styles.css";

import { useQuery } from "@apollo/client";
import {
  Box,
  ButtonBase,
  Container,
  Grid,
  Link as MuiLink,
  SvgIcon,
  Typography,
} from "@mui/material";
import Image from "mui-image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ReactMarkdown from "react-markdown";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import AuthorCard from "../../components/UI/AuthorCard";
import Spinner from "../../components/UI/Spinner";
import { GET_REVIEW_IMAGES } from "../../queries";

const CollectionPage = () => {
  const [openImgIdx, setOpenImgIdx] = useState(-1);
  const [openDetailImgIdx, setOpenDetailImgIdx] = useState(-1);
  const [openDetailsGallery, setOpenDetailsGallery] = useState(false);
  const router = useRouter();
  const { slug } = router.query;

  const { loading, data } = useQuery(GET_REVIEW_IMAGES, {
    variables: { slug },
  });

  if (loading) return <Spinner />;
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
  console.log(livestream);

  const detailSlides = detail?.slidesV2?.slide?.map((slide) => ({
    src: slide.photosTout.url,
    alt: slide.photosTout.altText,
  }));
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
      <Box
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
          textAlign: "center",
          "& > iframe": {
            width: "100%",
          },
        }}
      >
        {livestream && (
          <iframe
            width={960}
            height={540}
            src={`${livestream}?autoplay=1`}
            title="Show Livestream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </Box>
      <ReactMarkdown
        components={{
          p: ({ node, ...props }) => (
            <Typography
              {...props}
              sx={{
                whiteSpace: "pre-line",
                // fontFamily: "BB",
              }}
            />
          ),
        }}
      >
        {body}
      </ReactMarkdown>
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
          <SvgIcon
            sx={{
              fontSize: {
                xs: 24,
                md: 35,
              },
              transform: openDetailsGallery ? "rotate(136deg)" : "rotate(0deg)",
              transition: "transform 0.5s",
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
            </svg>
          </SvgIcon>
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
