import {
  Avatar,
  Box,
  Button,
  Divider,
  Input,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

import ProfileNav from "../../components/UI/ProfileNav";
import Spinner from "../../components/UI/Spinner";
import { FBContext } from "../../context/FBContext";
import { BookmarkFilled } from "../../components/UI/Icons/Bookmark";

const Account = () => {
  const { updateUsername, favArticles, uploadToStorage, currentUser, loading } =
    useContext(FBContext);
  const router = useRouter();
  const { push } = router;

  const nameRef = useRef(null);

  const handleSubmit = () => {
    updateUsername(nameRef.current.value);
  };

  useEffect(() => {
    if (!currentUser && !loading) {
      push("/");
    }
  }, [currentUser, loading, push]);

  const readFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      await uploadToStorage(reader.result);
    };
  };
  if (loading) return <Spinner />;
  if (!currentUser) return <div>Not logged in</div>;
  return (
    <>
      <Head>
        <title>My Account - Saved Articles</title>
      </Head>

      <>
        <ProfileNav />
        <Divider
          sx={{
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        />
        <Divider
          sx={{
            my: 0.5,
            display: {
              xs: "none",
              lg: "block",
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              maxWidth: 300,
            }}
          >
            <Box
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <SvgIcon sx={{ fontSize: 16 }}>
                <path d="M12,17.27L18.18,21L16.54,14.35L22,9.24L15.45,8.73L12,2.28L8.55,8.73L2,9.24L7.45,14.35L5.82,21L12,17.27Z" />
              </SvgIcon>
              <Typography>Update your profile</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  fontFamily: "BB",
                  color: "text.secondary",
                }}
              >
                Name
              </Typography>{" "}
              <Box
                sx={{
                  display: "flex",
                }}
              >
                <TextField
                  defaultValue={currentUser.displayName}
                  variant="standard"
                  inputRef={nameRef}
                />
              </Box>
              <Button variant="default" color="primary" onClick={handleSubmit}>
                Update
              </Button>
            </Box>
            <Input type="file" onChange={(e) => readFile(e.target.files[0])} />
          </Box>
          {/* stats */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                gap: 1,
                display: "flex",
                alignItems: "center",
                color: "text.secondary",
              }}
            >
              <SvgIcon sx={{ fontSize: 16 }}>
                <path d="M12,17.27L18.18,21L16.54,14.35L22,9.24L15.45,8.73L12,2.28L8.55,8.73L2,9.24L7.45,14.35L5.82,21L12,17.27Z" />
              </SvgIcon>
              <Typography>Your data</Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <Avatar
                src={currentUser.photoURL}
                sx={{
                  width: 130,
                  height: 130,
                }}
              />
              <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "BB",
                    fontSize: 24,
                    color: "text.secondary",
                  }}
                >
                  {favArticles?.length}
                </Typography>
                <BookmarkFilled fontSize="16" />
              </Box>
            </Box>
          </Box>
        </Box>
      </>
    </>
  );
};

export default Account;
