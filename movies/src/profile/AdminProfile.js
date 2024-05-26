import { Box } from "@mui/system";
import React, { Fragment, useEffect, useState } from "react";
import { getAdminById } from "../api-helpers/api-helpers";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { List, ListItem, ListItemText, Typography } from "@mui/material";

const AdminProfile = () => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAdminById()
      .then((res) => {
        setAdmin(res.admin);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch admin data");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!admin) {
    return <Typography>No admin data available.</Typography>;
  }

  return (
    <Box width={"100%"} display="flex">
      <Fragment>
        <Box
          flexDirection={"column"}
          justifyContent="center"
          alignItems={"center"}
          width={"30%"}
          padding={3}
        >
          <AccountCircleIcon
            sx={{ fontSize: "10rem", textAlign: "center", ml: 3 }}
          />
          <Typography
            mt={1}
            padding={1}
            width={"auto"}
            textAlign={"center"}
            border={"1px solid #ccc"}
            borderRadius={6}
          >
            Email: {admin.email}
          </Typography>
        </Box>
        {admin.addedMovies && admin.addedMovies.length > 0 && (
          <Box width={"70%"} display="flex" flexDirection={"column"}>
            <Typography
              variant="h3"
              fontFamily={"verdana"}
              textAlign="center"
              padding={2}
            >
              Added Movies
            </Typography>
            <Box
              margin={"auto"}
              display="flex"
              flexDirection={"column"}
              width="80%"
            >
              <List>
                {admin.addedMovies.map((movie, index) => (
                  <ListItem
                    key={index}
                    sx={{
                      bgcolor: "#00d386",
                      color: "white",
                      textAlign: "center",
                      margin: 1,
                    }}
                  >
                    <ListItemText
                      sx={{ margin: 1, width: "auto", textAlign: "left" }}
                    >
                      Movie: {movie.title}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>
        )}
      </Fragment>
    </Box>
  );
};

export default AdminProfile;
