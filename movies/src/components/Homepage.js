import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MovieItem from "./Movies/MovieItem";
import { getAllMovies } from "../api-helpers/api-helpers";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

const Homepage = () => {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getAllMovies()
      .then((data) => setMovies(data.movies))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      width="100%"
      margin="auto"
      marginTop={2}
    >
      <Box
        width="58%"
        height="50vh"
        marginTop="6%"
        padding={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Carousel
          showArrows
          autoPlay
          infiniteLoop
          emulateTouch
          showThumbs={false}
        >
          <div>
            <img
              src="https://wallpaperaccess.com/full/8323791.jpg"
              alt="Bramastra"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://img.theweek.in/content/dam/week/news/entertainment/images/2020/10/26/Soorarai-Pottru-suriya.jpg"
              alt="Second "
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          <div>
            <img
              src="https://wallpapercave.com/wp/wp7649944.jpg"
              alt="Third "
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
          {/* Add more images as needed */}
        </Carousel>
      </Box>
      <Box padding={5} textAlign="center">
        <Typography variant="h4" marginTop={3}>
          Latest Releases
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="center"
        width="90%"
        marginBottom={5}
      >
        {movies &&
          movies
            .slice(0, 6)
            .map((movie, index) => (
              <MovieItem
                key={index}
                id={movie._id}
                title={movie.title}
                posterUrl={movie.posterUrl}
                releaseDate={movie.releaseDate}
              />
            ))}
      </Box>
      <Box display="flex" justifyContent="center" width="100%" padding={5}>
        <Button
          component={Link}
          to="/movies"
          variant="outlined"
          sx={{ color: "#2b2d42" }}
        >
          View All Movies
        </Button>
      </Box>
    </Box>
  );
};

export default Homepage;
