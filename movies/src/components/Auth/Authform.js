import {
  Box,
  Button,
  Dialog,
  FormLabel,
  TextField,
  Typography,
  IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import React, { useState } from "react";
import { Link } from "react-router-dom";
const labelStyle = { mt: 1, mb: 1 };
const Authform = ({ onSubmit,isAdmin }) => {
  const [inputs, setInputs] = useState({ name: "", email: "", password: "" });
  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({inputs,signup:isAdmin? false:isSignup});
  };
  return (
    <Dialog PaperProps={{ style: { borderRadius: 20 } }} open={true}>
      <Box sx={{ mt: "auto", padding: 1 }}>
        <IconButton LinkComponent={Link} to = "/" onClick={() => console.log("Close button clicked")}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Typography variant="h4" textAlign="Center">
        {isSignup ? "Signup" : "Login"}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          display={"flex"}
          justifycontent="Center"
          flexDirection={"column"}
          width={"400px"}
          margin={"auto"}
          alignContent={"center"}
          padding={6}
        >
          {!isAdmin && isSignup && (
            <>
              <FormLabel sx={labelStyle}>Name</FormLabel>
              <TextField
                value={inputs.name}
                onChange={handleChange}
                margin="normal"
                variant="standard"
                type="text"
                name="name"
              />
            </>
          )}

          <FormLabel sx={labelStyle}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            variant="standard"
            type="email"
            name="email"
          />

          <FormLabel sx={labelStyle}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant="standard"
            type="password"
            name="password"
          />
          <Button
            sx={{ mt: 2, borderRadius: 10, bgcolor: "#2b2d42" }}
            type="submit"
            fullWidth
            variant="contained"
          >
            {isSignup ? "Signup" : "Login"}
          </Button>
        { !isAdmin && <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ mt: 2, borderRadius: 10 }}
            fullWidth
          >
            Switch To {isSignup ? "Login" : "Signup"}
          </Button>}
        </Box>
      </form>
    </Dialog>
  );
};

export default Authform;
