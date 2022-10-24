import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper";
import { GET_LATEST_SHOW } from "../../queries";
import { Box, Typography, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import Image from "mui-image";
import "swiper/css/bundle";
import Spinner from "../UI/Spinner";

const LatestShow = () => {
  const { loading, data } = useQuery(GET_LATEST_SHOW);

  const slides = useMemo(() => {
    if (!data) return;
    if (data.allContent.Content[0].galleries.collection.slidesV2 === null)
      return; //if the slides havent been posted yet

    const slidesArr =
      data.allContent.Content[0].galleries.collection.slidesV2.slide;

    return slidesArr.slice(0, 8).map((slide) => (
      <SwiperSlide key={slide.photosTout.url}>
        <Link
          passHref
          href={{
            pathname: "/collection/[slug]",
            query: {
              slug: data.allContent.Content[0].slug,
            },
          }}
        >
          <MuiLink>
            <Image
              src={slide.photosTout.url}
              alt="runway image"
              sx={{
                p: {
                  xs: 0,
                  sm: 1,
                },
                cursor: "pointer",
              }}
            />
          </MuiLink>
        </Link>
      </SwiperSlide>
    ));
  }, [data]);

  if (loading) return <Spinner />;
  if (!data) return null;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: "20px" }}>
          
        </Typography>

        <Link
          passHref
          href={{
            pathname: "/collection/[slug]",
            query: {
              slug: data.allContent.Content[0].slug,
            },
          }}
        >
          <MuiLink
            underline="hover"
            sx={{
              fontSize: "38px",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {data.allContent.Content[0].title}
          </MuiLink>
        </Link>
      </Box>

      {/* collection images */}
      {slides && (
        <Swiper
          modules={[Pagination, Autoplay]}
          autoplay={{ delay: 3300 }}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
            type: "fraction",
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 4,
            },
            1280: {
              slidesPerView: 5,
            },
          }}
        >
          {slides}
        </Swiper>
      )}

      {/* video/upcoming livestream */}
      {!slides && data.allContent.Content[0].livestream !== null && (
        <Box sx={{ textAlign: "center" }}>
          <iframe
            width={960}
            height={540}
            src={`${data.allContent.Content[0].livestream}?autoplay=1`}
            title="Show Livestream"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
      )}
    </>
  );
};

export default LatestShow;
