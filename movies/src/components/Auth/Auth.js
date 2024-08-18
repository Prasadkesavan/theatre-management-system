





// newcode


import React from 'react';
import Authform from './Authform';
import { useDispatch } from 'react-redux';
import { userActions } from "../../store";
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { useNavigate } from 'react-router';

const Auth = () => {
  const navigate =useNavigate();
  const dispatch = useDispatch();

  const onResReceived = (data) => {
    console.log("Received Data:", data);

    if (data.error) {
      console.error("Authentication Error:", data.error);
      // You can add a user notification here if needed
      return;
    }

    if (data && data.user && data.user._id) {
      dispatch(userActions.login());
      localStorage.setItem("userId", data.user._id);
      navigate("/");
    } else {
      console.error("User ID is undefined. Full data:", data);
      // Handle this case, perhaps notify the user
      alert("Authentication succeeded, but user ID is missing in the response. Please contact support.");
    }
  };

  const getData = (data) => {
    console.log("Auth", data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.error("Error in getData:", err));
  };

  return (
    <div>
      <Authform onSubmit={getData} isAdmin={false} />
    </div>
  );
};

export default Auth;