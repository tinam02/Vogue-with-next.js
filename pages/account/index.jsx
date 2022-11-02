import { Avatar, Box, Button, Divider, Input, InputLabel, Link, SvgIcon, TextField, Typography } from '@mui/material';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef } from 'react';

import { BookmarkFilled } from '../../components/UI/Icons/Bookmark';
import ProfileNav from '../../components/UI/ProfileNav';
import Spinner from '../../components/UI/Spinner';
import useAlerts from '../../context/AlertContext';
import { FBContext } from '../../context/FBContext';

const Account = () => {
  const { updateUsername, favArticles, uploadToStorage, currentUser, loading } =
    useContext(FBContext);
  const { showAlert } = useAlerts();

  const router = useRouter();
  const { push } = router;

  const nameRef = useRef(null);

  const handleSubmit = async () => {
    if (!nameRef.current.value || nameRef.current.value.length < 3) {
      showAlert({
        message: "Username must be at least 3 characters long",
      });
      return;
    }
    const res = await updateUsername(nameRef.current.value);
    showAlert(res);
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
      const res = await uploadToStorage(reader.result);
      showAlert(res);
    };
  };

  if (loading) return <Spinner />;
  if (!currentUser) return <div>Not logged in</div>;
  return (
    <>
      <Head>
        <title>Profile</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "80vh",
        }}
      >
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
            flexDirection: "column",
            gap: 4,
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

            <Box
              sx={{
                display: "flex",
                gap: 3,
                alignItems: "center",
              }}
            >
              <InputLabel
                sx={{
                  fontFamily: "BB",
                  color: "text.secondary",
                }}
              >
                Profile picture
              </InputLabel>

              <Button
                variant="default"
                color="primary"
                component="label"
                sx={{
                  fontFamily: "BB",
                }}
              >
                Upload
                <Input
                  type="file"
                  sx={{
                    display: "none",
                  }}
                  inputProps={{
                    accept: "image/*",
                  }}
                  onChange={(e) => readFile(e.target.files[0])}
                />
              </Button>
            </Box>
          </Box>
          {/* stats */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",

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
                gap: 3,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                src={currentUser.photoURL}
                sx={{
                  width: 130,
                  height: 130,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    fontSize: 24,
                    fontFamily: "BB",
                  }}
                >
                  {currentUser?.displayName}
                </Typography>
                <Box sx={{ display: "flex", gap: 0.5, alignItems: "center" }}>
                  <BookmarkFilled fontSize="16" />
                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: 24,
                      fontFamily: "BB",
                      color: "text.secondary",
                    }}
                  >
                    {favArticles?.length}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Divider>
        <Link href="https://github.com/tinam02" target="_blank">
          <SvgIcon
            sx={{
              color: "text.primary",
              fontSize: 28,
            }}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2.24669C6.475 2.24669 2 6.72169 2 12.2467C2 16.6717 4.8625 20.4092 8.8375 21.7342C9.3375 21.8217 9.525 21.5217 9.525 21.2592C9.525 21.0217 9.5125 20.2342 9.5125 19.3967C7 19.8592 6.35 18.7842 6.15 18.2217C6.0375 17.9342 5.55 17.0467 5.125 16.8092C4.775 16.6217 4.275 16.1592 5.1125 16.1467C5.9 16.1342 6.4625 16.8717 6.65 17.1717C7.55 18.6842 8.9875 18.2592 9.5625 17.9967C9.65 17.3467 9.9125 16.9092 10.2 16.6592C7.975 16.4092 5.65 15.5467 5.65 11.7217C5.65 10.6342 6.0375 9.73419 6.675 9.03419C6.575 8.78419 6.225 7.75919 6.775 6.38419C6.775 6.38419 7.6125 6.12169 9.525 7.40919C10.325 7.18419 11.175 7.07169 12.025 7.07169C12.875 7.07169 13.725 7.18419 14.525 7.40919C16.4375 6.10919 17.275 6.38419 17.275 6.38419C17.825 7.75919 17.475 8.78419 17.375 9.03419C18.0125 9.73419 18.4 10.6217 18.4 11.7217C18.4 15.5592 16.0625 16.4092 13.8375 16.6592C14.2 16.9717 14.5125 17.5717 14.5125 18.5092C14.5125 19.8467 14.5 20.9217 14.5 21.2592C14.5 21.5217 14.6875 21.8342 15.1875 21.7342C17.1727 21.064 18.8977 19.7882 20.1198 18.0862C21.3419 16.3843 21.9995 14.3419 22 12.2467C22 6.72169 17.525 2.24669 12 2.24669Z"
              />
            </svg>
          </SvgIcon>
        </Link>
      </Divider>
    </>
  );
};

export default Account;
