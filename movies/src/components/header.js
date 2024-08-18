import React, { useEffect, useState } from "react";
import {
  AppBar,
  Tab,
  Tabs,
  Toolbar,
  Box,
  Autocomplete,
  TextField,
  IconButton,
} from "@mui/material";
import TheatersIcon from "@mui/icons-material/Theaters";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { adminActions, userActions } from "../store";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isUserloggedIn = useSelector((state) => state.user.isloggedIn); // Updated to use useSelector
  const isAdminloggedIn = useSelector((state) => state.admin.isloggedIn);
  const [value, setValue] = useState(0);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  const logout = (isAdmin) => {
    dispatch(isAdmin ? adminActions.logout() : userActions.logout());
  };

  const handleChange = (e, val) => {
    const movie = movies.find((mov) => mov.title === val);
    console.log(movie);
    if (isUserloggedIn && movie) {
      navigate(`/booking/${movie._id}`);
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#2b2d42" }}>
      <Toolbar>
        <Box width={"20%"}>
          <IconButton LinkComponent={Link} to="/">
            <TheatersIcon />
          </IconButton>
        </Box>
        <Box width={"30%"} margin={"auto"}>
          <Autocomplete
            onChange={handleChange}
            freeSolo
            options={movies && movies.map((option) => option.title)}
            renderInput={(params) => (
              <TextField
                sx={{ input: { color: "white" } }}
                variant="standard"
                {...params}
                label="Search across movies"
              />
            )}
          />
        </Box>
        <Box display={"flex"}>
          <Tabs
            textColor="inherit"
            indicatorColor="secondary"
            value={value}
            onChange={(e, val) => setValue(val)}
          >
            <Tab component={Link} to="/movies" label="Movies" />
            {!isAdminloggedIn &&
              !isUserloggedIn && [
                <Tab key="admin" label="Admin" component={Link} to="/admin" />,
                <Tab key="auth" label="Auth" component={Link} to="/auth" />,
              ]}
            {isUserloggedIn && [
              <Tab key="profile" label="Profile" component={Link} to="/user" />,
              <Tab
                key="logout"
                onClick={() => logout(false)}
                label="Logout"
                component={Link}
                to="/"
              />,
            ]}
            {isAdminloggedIn && [
              <Tab
                key="addMovie"
                label="Add Movie"
                component={Link}
                to="/add"
              />,
              <Tab
                key="adminProfile"
                label="Profile"
                component={Link}
                to="/user-admin"
              />,
              <Tab
                key="adminLogout"
                onClick={() => logout(true)}
                label="Log Out"
                component={Link}
                to="/"
              />,
            ]}
          </Tabs>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
